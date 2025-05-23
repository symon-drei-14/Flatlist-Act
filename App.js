import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  RefreshControl,
  Alert,
  Animated
} from 'react-native';
import {styles} from './assets/styles';

const ProductSkeleton = () => {
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    return () => pulseAnim.stopAnimation();
  }, []);

  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e1e1e1', '#f0f0f0'],
  });

  return (
    <View style={styles.productContainer}>
      <Animated.View style={[styles.imageContainer, styles.skeleton, { backgroundColor }]} />
      <View style={styles.productDetails}>
        <Animated.View style={[styles.skeletonTitle, { backgroundColor }]} />
        <View style={styles.priceRatingContainer}>
          <Animated.View style={[styles.skeletonPrice, { backgroundColor }]} />
          <Animated.View style={[styles.skeletonRating, { backgroundColor }]} />
        </View>
        <View style={styles.categoryContainer}>
          <Animated.View style={[styles.skeletonCategory, { backgroundColor }]} />
          <Animated.View style={[styles.skeletonButton, { backgroundColor }]} />
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [loadedIds, setLoadedIds] = useState(new Set());
  
  const limit = 10;

  const fetchProducts = async (loadMore = false) => {
    if ((isLoading && !loadMore) || (loadMore && !hasMore)) return;

    loadMore ? setIsLoadingMore(true) : setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const allProducts = await response.json();
      
      const currentPage = loadMore ? page : 1;
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      const newProducts = allProducts.slice(startIndex, endIndex);
      
      const uniqueNewProducts = newProducts.filter(
        product => !loadedIds.has(product.id)
      );

      if (uniqueNewProducts.length === 0) {
        setHasMore(false);
      } else {
        const newIds = new Set(loadedIds);
        uniqueNewProducts.forEach(product => newIds.add(product.id));
        setLoadedIds(newIds);
        
        setProducts(prevProducts => 
          loadMore ? [...prevProducts, ...uniqueNewProducts] : uniqueNewProducts
        );
        setPage(currentPage + 1);
        setHasMore(uniqueNewProducts.length === limit && endIndex < allProducts.length);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
      if (!loadMore) {
        setProducts([]);
      }
      console.error('API error:', err);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      loadMore ? setIsLoadingMore(false) : setIsLoading(false);
      setIsRefreshing(false);
      setShowSkeleton(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowSkeleton(true);
    setPage(1);
    setHasMore(true);
    setLoadedIds(new Set());
    fetchProducts();
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore && products.length > 0) {
      fetchProducts(true);
    }
  };

  useEffect(() => {
    setShowSkeleton(true);
    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image || 'https://picsum.photos/300/300' }} 
          style={styles.productImage} 
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title || 'No Title'}
        </Text>
        
        <View style={styles.priceRatingContainer}>
          <Text style={styles.productPrice}>${item.price || '0'}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating?.rate || '4.5'}</Text>
          </View>
        </View>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.productCategory} numberOfLines={1}>
            {item.category || 'Unknown'}
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!hasMore && products.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>No more products to load</Text>
        </View>
      );
    }
    return isLoadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading more products...</Text>
      </View>
    ) : null;
  };

  // Error state
  if (error && products.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Catalog</Text>
      </View>
      
      {showSkeleton || isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => <ProductSkeleton />}
          keyExtractor={item => item.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#6C63FF']}
              tintColor="#6C63FF"
            />
          }
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#6C63FF']}
              tintColor="#6C63FF"
            />
          }
        />
      )}
    </View>
  );
};


export default App;