import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

   container: {
     flex: 1,
     backgroundColor: '#f8f9fa',
   },
   centerContent: {
     justifyContent: 'center',
     alignItems: 'center',
   },
   header: {
     padding: 16,
     backgroundColor: '#6C63FF',
   },
   headerTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     color: 'white',
     textAlign: 'center',
   },
   listContent: {
     paddingHorizontal: 12,
     paddingBottom: 20,
   },
   productContainer: {
     backgroundColor: '#fff',
     borderRadius: 12,
     padding: 16,
     marginVertical: 8,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 6,
     elevation: 3,
     flexDirection: 'row',
   },
   imageContainer: {
     width: 100,
     height: 100,
     backgroundColor: '#f9f9f9',
     borderRadius: 8,
     justifyContent: 'center',
     alignItems: 'center',
     marginRight: 16,
   },
   productImage: {
     width: '80%',
     height: '80%',
   },
   productDetails: {
     flex: 1,
     justifyContent: 'space-between',
   },
   productTitle: {
     fontSize: 15,
     fontWeight: '600',
     color: '#333',
     marginBottom: 8,
   },
   priceRatingContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 8,
   },
   productPrice: {
     fontSize: 18,
     fontWeight: 'bold',
     color: '#6C63FF',
   },
   ratingContainer: {
     backgroundColor: 'rgba(108, 99, 255, 0.1)',
     paddingHorizontal: 8,
     paddingVertical: 4,
     borderRadius: 10,
   },
   ratingText: {
     fontSize: 14,
     color: '#6C63FF',
   },
   categoryContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
   },
   productCategory: {
     fontSize: 12,
     color: '#888',
     textTransform: 'capitalize',
     fontStyle: 'italic',
     flex: 1,
   },
   addButton: {
     width: 24,
     height: 24,
     borderRadius: 12,
     backgroundColor: '#6C63FF',
     justifyContent: 'center',
     alignItems: 'center',
   },
   addButtonText: {
     color: 'white',
     fontSize: 16,
     fontWeight: 'bold',
     marginTop: -2,
   },
   footer: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     paddingVertical: 16,
   },
   footerText: {
     color: '#666',
     fontSize: 14,
   },
   loadingText: {
     marginLeft: 8,
     color: '#6C63FF',
   },
   errorText: {
     color: '#d32f2f',
     fontSize: 16,
     textAlign: 'center',
     marginBottom: 16,
     paddingHorizontal: 20,
   },
   retryButton: {
     backgroundColor: '#6C63FF',
     paddingHorizontal: 24,
     paddingVertical: 12,
     borderRadius: 8,
   },
   retryButtonText: {
     color: 'white',
     fontSize: 16,
     fontWeight: '600',
   },
   // Skeleton styles
   skeleton: {
     borderRadius: 8,
   },
   skeletonTitle: {
     height: 15,
     borderRadius: 4,
     marginBottom: 8,
   },
   skeletonPrice: {
     height: 18,
     width: 60,
     borderRadius: 4,
   },
   skeletonRating: {
     height: 24,
     width: 50,
     borderRadius: 10,
   },
   skeletonCategory: {
     height: 12,
     width: 80,
     borderRadius: 4,
   },
   skeletonButton: {
     width: 24,
     height: 24,
     borderRadius: 12,
   },
 });
 

