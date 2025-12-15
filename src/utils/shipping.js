export const calculateShippingCost = (department, cartItems) => {
  if (!department) return 0;
  
  // Normalize department name to ensure case-insensitive comparison if needed, 
  // though generally exact match is expected from the select input.
  if (department === 'Atlántico') {
    return 0;
  }

  // Check for air conditioners with 36000 BTU or less
  const hasSpecialAirConditioner = cartItems?.some(
    (item) => {
      // Safely access properties
      const product = item.productId || {};
      const category = (product.category ?? '').toLowerCase();
      const description = (product.description ?? '').toLowerCase();
      const name = (product.name ?? '').toLowerCase();
      
      const isAC = category.includes('aire') || 
                   description.includes('aire acondicionado') ||
                   name.includes('aire');
      
      if (!isAC) return false;
      
      const btuValue = product.specs?.btu;
      const btuNumber = typeof btuValue === 'string' ? parseInt(btuValue) : btuValue;
      
      // Check if BTU is <= 36000
      const isSpecialBTU = btuNumber !== undefined && !isNaN(btuNumber) && btuNumber <= 36000;
      
      return isSpecialBTU;
    }
  ) || false;

  if (hasSpecialAirConditioner) {
    return 200000;
  } else {
    return 20000;
  }
};
