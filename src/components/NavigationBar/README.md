# NavigationBar Components

This directory contains the refactored NavigationBar components split into modular, reusable pieces.

## Components

### `ThemeToggle.vue`
Handles theme switching between light and dark mode.

**Props:**
- `size`: Button size ('tiny' | 'small' | 'medium' | 'large')
- `quaternary`: Whether to use quaternary button style
- `block`: Whether the button should be full width
- `showTooltip`: Whether to show tooltip on hover

**Features:**
- Integrates with `useTheme` composable
- Animated rotation effect on hover
- Supports both tooltip and inline text modes

### `LanguageToggle.vue`
Handles language switching between English and German.

**Props:**
- `size`: Button size ('tiny' | 'small' | 'medium' | 'large')
- `quaternary`: Whether to use quaternary button style
- `block`: Whether the button should be full width
- `showTooltip`: Whether to show tooltip on hover
- `showLanguageCode`: Whether to display current language code

**Features:**
- Integrates with Vue I18n
- Automatically updates document language
- Supports both tooltip and inline text modes

### `MobileDrawer.vue`
Contains the complete mobile navigation drawer.

**Props:**
- `show`: Controls drawer visibility
- `menuOptions`: Array of menu options for navigation

**Events:**
- `update:show`: Emitted when drawer should be closed
- `menu-select`: Emitted when a menu item is selected

**Features:**
- Full-screen mobile drawer
- Integrated ThemeToggle and LanguageToggle
- Social media links
- Smooth backdrop blur effect
- Responsive menu styling

### `BurgerIcon.vue`
Pure SVG hamburger menu icon component.

**Props:** None

**Features:**
- Clean SVG implementation
- Inherits color from parent
- Scalable vector graphics

### `MobileMenuButton.vue`
Mobile menu trigger button with burger icon.

**Props:**
- `size`: Button size ('tiny' | 'small' | 'medium' | 'large')
- `quaternary`: Whether to use quaternary button style

**Events:**
- `click`: Emitted when button is clicked

**Features:**
- Responsive visibility (hidden on desktop)
- Integrated BurgerIcon component
- Proper click handling

## Usage

```vue
<script setup>
import { 
  ThemeToggle, 
  LanguageToggle, 
  MobileDrawer, 
  MobileMenuButton,
  BurgerIcon 
} from '@/components/NavigationBar'
</script>

<template>
  <!-- Desktop usage -->
  <ThemeToggle size="small" :show-tooltip="true" />
  <LanguageToggle size="small" :show-tooltip="true" />
  
  <!-- Mobile usage -->
  <MobileMenuButton @click="showMobileMenu = true" />
  <MobileDrawer 
    v-model:show="showMobileMenu"
    :menu-options="menuOptions"
    @menu-select="handleMenuSelect"
  />
  
  <!-- Standalone burger icon -->
  <BurgerIcon />
</template>
```

## Architecture Benefits

- **Separation of Concerns**: Each component handles a single responsibility
- **Reusability**: Components can be used independently in other parts of the app
- **Maintainability**: Easier to test and modify individual features
- **Type Safety**: Proper TypeScript interfaces for all props and events
- **Consistency**: Standardized prop patterns across components
- **Modular Icons**: SVG components can be reused across different UI elements
- **Event-Driven Architecture**: Clean component communication through emit/props pattern 