# Implementation Plan - Premium Certificate Gallery & Grid Modal

This plan outlines the overhaul of the certificate section to a premium, image-only gallery with advanced viewing options.

## User Review Required

> [!IMPORTANT]
> **Data Extraction**: I will be performing a "visual read" of all 103 certificate images to extract precise data (Title, Issuer, Category). This will take some time but ensures 100% accuracy.
> **Pop-up UI**: The "See All" modal will feature a Google Photos-inspired grid with real-time size adjustment (S/M/L).

## Proposed Changes

### 1. Data Identification & Extraction
- **Manual Vision Review**: I will go through all 103 images in `src/components/Certificates/` using my vision tools across multiple batches.
- **process-certs.js**: Update with the full dataset, mapping every file to its correct metadata and one of the 10 official categories.

### 2. Gallery Component Overhaul [MODIFY] [Certificates.tsx](file:///d:/Personal%20Porfolio/next-portfolio/src/components/sections/Certificates.tsx)
- Limit the main carousel to exactly 5 featured/representative certificates.
- Add a custom 6th card: **"See All"** with a distinct visual style (blur-glass effect).
- Implement the trigger logic for the new modal.

### 3. "See All" Premium Modal [NEW] [CertificateModal.tsx](file:///d:/Personal%20Porfolio/next-portfolio/src/components/ui/CertificateModal.tsx)
- **Full-screen Overlay**: Blur background with premium Framer Motion transitions.
- **Grid Controls**: Header with 3 icons (LayoutGrid, Grid3X3, Grid2X2) to switch between 3 grid sizes (Small, Medium, Large).
- **Dynamic Loading**: Use `react-intersection-observer` or simple lazy-loading for the 100+ certificates to maintain performance.
- **Card Design**: Premium cards with hover effects, displaying title and issuer clearly.

### 4. Navbar Logic Refinement [MODIFY] [Navbar.tsx](file:///d:/Personal%20Porfolio/next-portfolio/src/components/layout/Navbar.tsx)
- Implement the "6vh of About" threshold for the upward transition to the Hero section.

### 5. Cleanup
- Delete [PDFThumbnail.tsx](file:///d:/Personal%20Porfolio/next-portfolio/src/components/ui/PDFThumbnail.tsx).
- Remove `pdfjs-dist` from [package.json](file:///d:/Personal%20Porfolio/next-portfolio/package.json).

## Verification Plan

### Automated
- `npm run build` to ensure type safety.
- `node scripts/process-certs.js` to verify data generation.

### Manual
- Test the grid size switcher in the modal.
- Verify the modal animations on both mobile and desktop.
- Confirm the navbar DP snaps back precisely at the 6vh About point.
