"use client";

import React from 'react';
import MenuHero from './components/MenuHero';
import MenuFilters, { SortOption, ALL_CATEGORY, CategoryFilter } from './components/MenuFilters';
import MenuGrid from './components/MenuGrid';
import MenuSkeleton from './components/MenuSkeleton';
import ProductQuickViewModal from '@/features/product/components/ProductQuickViewModal';
import { useMenuHook } from './hooks/useMenuHook';
import { getDisplayPrice, getBadgeLabel } from './utils/menuUtils';
import type { HomeMenuItem } from '@/features/home/hooks/useHomeHook';

export default function MenuMain() {
  const { menuItems, categories, loading, error } = useMenuHook();

  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>(ALL_CATEGORY);
  const [sortBy, setSortBy] = React.useState<SortOption>('popular');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<HomeMenuItem | null>(null);

  const filteredItems = React.useMemo(() => {
    let result = menuItems.filter((item) => {
      const matchesCategory = activeCategory === ALL_CATEGORY || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort(
        (a, b) => (getDisplayPrice(a).price ?? Infinity) - (getDisplayPrice(b).price ?? Infinity)
      );
    }
    if (sortBy === 'price-high') {
      result = [...result].sort(
        (a, b) => (getDisplayPrice(b).price ?? -Infinity) - (getDisplayPrice(a).price ?? -Infinity)
      );
    }
    if (sortBy === 'popular') {
      result = [...result].sort(
        (a, b) => Number(!!getBadgeLabel(b)) - Number(!!getBadgeLabel(a))
      );
    }

    return result;
  }, [menuItems, activeCategory, sortBy, searchQuery]);

  const handleClearFilters = () => {
    setActiveCategory(ALL_CATEGORY);
    setSearchQuery('');
  };

  if (loading) {
    return <MenuSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center text-[12px] font-bold text-red-500 uppercase tracking-[0.15em]">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <MenuHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={filteredItems.length}
        totalCount={menuItems.length}
      />

      <MenuGrid
        items={filteredItems}
        onOpenItem={setSelectedProduct}
        onClearFilters={handleClearFilters}
      />

      {/* Same shared modal Home uses — it already owns variant selection,
          quantity, pricing and the Redux cart flow internally. */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
