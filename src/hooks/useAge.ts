import { useState, useEffect } from 'react';

export const useAge = (birthDateString: string): number | null => {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date(birthDateString);
      const today = new Date();
      let currentAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        currentAge--;
      }
      setAge(currentAge);
    };

    calculateAge();

    const intervalId = setInterval(calculateAge, 1000 * 60 * 60 * 24); 

    return () => clearInterval(intervalId); 
  }, [birthDateString]);

  return age;
};