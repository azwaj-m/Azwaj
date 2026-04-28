export const generateProfiles = (count = 50) => {
    const names = ["Ayesha", "Hina", "Zainab", "Rabia", "Sadia", "Maria", "Sidra", "Nimra", "Kiran", "Mehak"];
    const cities = ["Lahore", "Karachi", "Islamabad", "Multan", "Faisalabad"];
    
    return Array.from({ length: count }, (_, i) => ({
        id: `${i + 1}`,
        fullName: `${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}.`,
        age: 22 + (i % 10),
        profession: i % 2 === 0 ? "Software Engineer" : "Teacher",
        city: cities[i % cities.length],
        religion: "Muslim",
        profileImg: `https://i.pravatar.cc/150?u=${i + 50}`, // فرضی تصاویر
        verificationStatus: i % 3 === 0,
        isOnline: i % 4 === 0
    }));
};

export const initialProfiles = generateProfiles(50);
