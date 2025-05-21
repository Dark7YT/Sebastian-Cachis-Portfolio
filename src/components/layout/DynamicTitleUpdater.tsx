import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface DynamicTitleUpdaterProps {
  titleKey: string;
}

const DynamicTitleUpdater: React.FC<DynamicTitleUpdaterProps> = ({ titleKey }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const newTitle = t(titleKey);
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
  }, [t, titleKey, i18n.language]);

  return null;
};

export default DynamicTitleUpdater;