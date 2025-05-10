import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const USERS_STORAGE_KEY = '@greenstep_users';

// Define the initial structure for user-specific game data
const initialUserGameData = {
  points: 0,
  badges: [],
  scanHistory: [], // Array of { qrId: string, timestamp: number, pointsEarned: number }
  lastScanTimestamps: {}, // { [qrId: string]: timestamp }
  consecutiveScanData: {}, // { [qrId: string]: { count: number, lastScanDate: string (YYYY-MM-DD) } }
  totalScansByQr: {}, // { [qrId: string]: number }
  displayName: '',
  photoBase64: null, // Profil fotoğrafı için base64 string
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load users from AsyncStorage on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.error("Failed to load users from storage", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Save users to AsyncStorage whenever the users state changes
  useEffect(() => {
    const saveUsers = async () => {
      if (!isLoading) { // Avoid saving initial empty state before loading
        try {
          await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        } catch (error) {
          console.error("Failed to save users to storage", error);
        }
      }
    };
    saveUsers();
  }, [users, isLoading]);
  
  const getCurrentUser = () => {
    if (!currentUserEmail) return null;
    const user = users.find(user => user.email === currentUserEmail);
    if (user && !user.displayName) {
      return { ...user, displayName: user.email.split('@')[0] };
    }
    return user || null;
  };
  
  const updateCurrentUser = (updatedData) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.email === currentUserEmail ? { ...user, ...updatedData } : user
      )
    );
  };

  const updateUserProfile = (emailToUpdate, newData) => {
    let userUpdated = false;
    let newEmailForCurrentUser = null;

    const updatedUsers = users.map(user => {
      if (user.email === emailToUpdate) {
        const modifiableData = { ...user }; 

        if (newData.hasOwnProperty('displayName')) {
          modifiableData.displayName = newData.displayName;
        }
        if (newData.hasOwnProperty('photoBase64')) { // photoBase64 güncellemesi
          modifiableData.photoBase64 = newData.photoBase64;
        }

        if (newData.email && newData.email !== user.email) {
          if (users.some(u => u.email === newData.email && u.email !== emailToUpdate)) {
            console.warn("updateUserProfile: New email already in use by another account.");
            return user;
          }
          modifiableData.email = newData.email;
          if (emailToUpdate === currentUserEmail) {
            newEmailForCurrentUser = newData.email;
          }
        }
        userUpdated = true;
        return { ...user, ...modifiableData };
      }
      return user;
    });

    if (userUpdated) {
      setUsers(updatedUsers);
      if (newEmailForCurrentUser) {
        setCurrentUserEmail(newEmailForCurrentUser);
      }
      return { success: true, message: "Profil bilgileri güncellendi." };
    } else {
      return { success: false, message: "Profil bilgileri güncellenemedi veya e-posta zaten kullanımda." };
    }
  };

  const register = (email, password) => {
    if (users.some(user => user.email === email)) {
      return { success: false, message: 'Bu email adresi zaten kayıtlı!' };
    }
    const displayNameFromEmail = email.split('@')[0];
    const newUser = {
      email,
      password,
      displayName: displayNameFromEmail,
      photoBase64: null, // Yeni kullanıcı için başlangıçta fotoğraf yok
      ...JSON.parse(JSON.stringify(initialUserGameData)), // Diğer oyun verileri
    };
    // initialUserGameData'dan gelen displayName ve photoBase64'ü ezelim (yukarıda zaten verdik)
    delete newUser.displayName;
    newUser.displayName = displayNameFromEmail;
    delete newUser.photoBase64; 
    newUser.photoBase64 = null;

    setUsers([...users, newUser]);
    return { success: true, message: 'Kayıt başarılı!' };
  };

  const login = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setCurrentUserEmail(email);
      return { success: true, message: 'Giriş başarılı!' };
    }
    return { success: false, message: 'Email veya şifre hatalı!' };
  };

  const logout = () => {
    setCurrentUserEmail(null);
    // Optionally clear other sensitive session data if needed
  };

  const processQrScan = (qrId) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "Kullanıcı bulunamadı. Lütfen giriş yapın.", newBadges: [] };
    }

    let userData = { ...currentUser }; // Shallow copy is enough for top-level, but deep copy for nested
    userData.lastScanTimestamps = { ...currentUser.lastScanTimestamps };
    userData.scanHistory = [...currentUser.scanHistory];
    userData.badges = [...currentUser.badges];
    userData.consecutiveScanData = JSON.parse(JSON.stringify(currentUser.consecutiveScanData)); // Deep copy
    userData.totalScansByQr = { ...currentUser.totalScansByQr };


    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // 1. Cooldown Check
    if (userData.lastScanTimestamps[qrId] && (now - userData.lastScanTimestamps[qrId] < oneHour)) {
      const timeLeft = Math.ceil((oneHour - (now - userData.lastScanTimestamps[qrId])) / (60 * 1000));
      return { success: false, message: `Bu QR kodu ${timeLeft} dakika sonra tekrar okutabilirsiniz.`, newBadges: [] };
    }

    // 2. Update Points & History
    userData.points += 10;
    userData.scanHistory.push({ qrId, timestamp: now, pointsEarned: 10 });
    userData.lastScanTimestamps[qrId] = now;
    
    let newBadgesAwarded = [];

    // 3. "Atık Avcısı" Badge (First scan of *any* QR for this user if logic is per user not per QR)
    // The requirement says "QR kodu ilk kez okuttuğunda", implying per user, not per specific QR code.
    // Let's assume "Atık Avcısı" is for the very first QR scan ever by the user.
    if (userData.scanHistory.length === 1 && !userData.badges.includes("Atık Avcısı")) {
       userData.badges.push("Atık Avcısı");
       newBadgesAwarded.push("Atık Avcısı");
    }
    
    // 4. Consecutive Daily Scans & Total Scans (Per QR ID)
    const todayStr = new Date(now).toISOString().split('T')[0]; // YYYY-MM-DD

    // Initialize data for this qrId if it doesn't exist
    if (!userData.consecutiveScanData[qrId]) {
      userData.consecutiveScanData[qrId] = { count: 0, lastScanDate: null };
    }
    if (!userData.totalScansByQr[qrId]) {
      userData.totalScansByQr[qrId] = 0;
    }
    
    const consecutiveData = userData.consecutiveScanData[qrId];

    if (consecutiveData.lastScanDate !== todayStr) { // Only update consecutive count once per day
        const yesterdayStr = new Date(now - 24 * oneHour).toISOString().split('T')[0];
        if (consecutiveData.lastScanDate === yesterdayStr) {
            consecutiveData.count++;
        } else {
            consecutiveData.count = 1; // Reset if a day was missed or first scan for streak
        }
        consecutiveData.lastScanDate = todayStr;
    }

    if (consecutiveData.count >= 7 && !userData.badges.includes("Çevreleyen")) {
        userData.badges.push("Çevreleyen");
        newBadgesAwarded.push("Çevreleyen");
    }
    if (consecutiveData.count >= 30 && !userData.badges.includes("Doğa Dostu")) {
        userData.badges.push("Doğa Dostu");
        newBadgesAwarded.push("Doğa Dostu");
    }

    // 5. Total Okutma Sayısı Rozeti (per QR code)
    userData.totalScansByQr[qrId]++;
    if (userData.totalScansByQr[qrId] >= 100 && !userData.badges.includes("Ekosavaşçı")) {
        userData.badges.push("Ekosavaşçı");
        newBadgesAwarded.push("Ekosavaşçı");
    }
    
    updateCurrentUser(userData);

    let message = "10 puan kazandınız!";
    if (newBadgesAwarded.length > 0) {
        message += ` Yeni rozetler: ${newBadgesAwarded.join(', ')}`;
    }

    return { success: true, message, pointsEarned: 10, newBadges: newBadgesAwarded };
  };


  return (
    <AuthContext.Provider value={{ 
        users, 
        currentUserEmail, 
        currentUser: getCurrentUser(),
        isLoading, 
        register, 
        login, 
        logout, 
        processQrScan,
        updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 