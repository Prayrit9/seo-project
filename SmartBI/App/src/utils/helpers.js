import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const pickImage = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }
        return null;
    } catch (error) {
        Alert.alert('Error', 'Failed to pick image');
        return null;
    }
};

export const scanDocument = async () => {
    try {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }
        return null;
    } catch (error) {
        Alert.alert('Error', 'Failed to scan document');
        return null;
    }
};

export const generateInsight = async (type) => {
    // Simulated API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const insights = {
                revenue: {
                    title: 'Revenue Growth Opportunity',
                    description: 'Based on market analysis, there\'s a potential 15% revenue increase by optimizing your pricing strategy in the next quarter.',
                    category: 'Revenue',
                },
                cost: {
                    title: 'Cost Optimization Alert',
                    description: 'Your operational costs have increased by 8% this month. Consider reviewing supplier contracts and optimizing inventory levels.',
                    category: 'Cost',
                },
                strategy: {
                    title: 'Market Trend Analysis',
                    description: 'Customer preferences are shifting towards digital services. Consider expanding your online presence and digital offerings.',
                    category: 'Strategy',
                },
            };
            resolve(insights[type]);
        }, 1500);
    });
}; 