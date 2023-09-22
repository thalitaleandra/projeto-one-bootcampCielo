import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  Typography,
} from '@mui/material'

import React from 'react'

interface FilterSidebarProps {
  open: boolean
  onClose: () => void
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
  onPriceChange: (priceRange: number[]) => void
  onRatingChange: (rating: number) => void
}

const categories = ['Electronics', 'Clothing', 'Books']
const subcategories = [
  'Smartphones',
  'Laptops',
  'T-Shirts',
  'Jeans',
  'Fiction',
  'Non-Fiction',
]

export default function FilterSidebar({
  open,
  onClose,
  onCategoryChange,
  onSubcategoryChange,
  onPriceChange,
  onRatingChange,
}: FilterSidebarProps) {
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category)
  }

  const handleSubcategoryClick = (subcategory: string) => {
    onSubcategoryChange(subcategory)
  }

  const handlePriceChange = (event: Event, priceRange: number | number[]) => {
    onPriceChange(priceRange as number[])
  }

  const handleRatingChange = (event: Event, rating: number | number[]) => {
    onRatingChange(rating as number)
  }

  return (
    <div>
      <List>
        <Typography variant="h6" gutterBottom>
          Categorias
        </Typography>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Typography variant="h6" gutterBottom>
          Subcategorias
        </Typography>
        {subcategories.map((subcategory) => (
          <ListItem
            button
            key={subcategory}
            onClick={() => handleSubcategoryClick(subcategory)}
          >
            <ListItemText primary={subcategory} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Typography variant="h6" gutterBottom>
          Preço
        </Typography>
        <Slider
          value={[0, 1000]} // Valor inicial do intervalo de preço
          max={1000}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
        />
      </List>
      <Divider />
      <List>
        <Typography variant="h6" gutterBottom>
          Avaliação
        </Typography>
        <Slider
          value={0} // Valor inicial da avaliação
          max={5}
          step={0.1}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value.toFixed(1)}
        />
      </List>
    </div>
  )
}
