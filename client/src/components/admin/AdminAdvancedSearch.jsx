import React, { useState } from "react"
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Popover,
  Typography,
  Slider,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material"

const AdminAdvancedSearch = ({ onSearch, filters, categories }) => {
  const [searchText, setSearchText] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [dateRange, setDateRange] = useState([null, null])
  const [anchorEl, setAnchorEl] = useState(null)

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = () => {
    onSearch({
      searchText,
      categories: selectedCategories,
      priceRange,
      dateRange,
    })
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<FilterIcon />}
          onClick={handleFilterClick}
        >
          Filters
        </Button>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 3, width: 300 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
          />

          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Date Range</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <DatePicker
                label="From"
                value={dateRange[0]}
                onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
              />
              <DatePicker
                label="To"
                value={dateRange[1]}
                onChange={(newValue) => setDateRange([dateRange[0], newValue])}
              />
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              handleSearch()
              handleClose()
            }}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Popover>
    </Box>
  )
}

export default AdminAdvancedSearch
