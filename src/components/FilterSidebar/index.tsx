import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slider,
  Typography,
} from '@mui/material'

import React, { useState } from 'react'

interface FilterSidebarProps {
  onCategoryChange: (category: string) => void
  onPriceChange: (priceRange: number[]) => void
  onRatingChange: (rating: number) => void
}

const categories = [
  'Tools',
  'Sports',
  'Automotive',
  'Toys',
  'Kids',
  'Outdoors',
  'Music',
  'Books',
  'Health',
]

export default function FilterSidebar({
  onCategoryChange,
  onPriceChange,
  onRatingChange,
}: FilterSidebarProps) {
  const [value, setValue] = useState<number | number[]>([0, 1000])
  const [rating, setRating] = useState<number>(0)

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category)
  }

  const handlePriceChange = (event: Event, priceRange: number | number[]) => {
    onPriceChange(priceRange as number[])
    setValue(priceRange as number[])
  }

  const handleRatingChange = (event: Event, rating: number | number[]) => {
    onRatingChange(rating as number)
    setRating(rating as number)
  }

  return (
    <div>
      <List>
        <Typography variant="h6" gutterBottom>
          Categorias
        </Typography>
        {categories.map((category) => (
          <ListItem
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            <ListItemText
              primary={category}
              sx={{
                cursor: 'pointer',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Typography variant="h6" gutterBottom>
          Preço
        </Typography>
        <Slider
          value={value}
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
          value={rating}
          max={5}
          step={0.1}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value.toFixed(1)}
        />
      </List>
      <Divider />
    </div>
  )
}
