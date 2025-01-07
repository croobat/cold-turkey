import { useSelector } from 'react-redux';
import { selectTheme } from '@/store/settingsSlice';

const useTheme = () => {
	return useSelector(selectTheme || 'light');
};

export { useTheme };
