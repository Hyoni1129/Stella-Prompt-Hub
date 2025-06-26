
## Stella Web Tool Suite: Detailed Design Guide

Based on the core values of the Stella project—Simplicity, Utility, Ad-Free, and Friendliness—this document proposes a detailed design guide to provide a consistent and engaging user experience. This guide will serve as a standard for creating all web tool pages under the Stella brand. While you should follow this guide, you are encouraged to suggest better improvements or ideas and design pages freely.

To date, Stella has only created a World Clock Calculator page, but it will expand by creating more pages for various simple daily tasks (e.g., Unit Converter, Sleep Calculator, etc.).

All pages will be produced in English as the primary language, with Korean available as an option.

---

### 1. Design Philosophy & Principles

-   The design should be exceptionally clean and simple, like Apple's homepage, while incorporating Stella's unique, friendly, and cute aesthetic.

-   **Simplicity First:** Eliminate unnecessary visual elements to help users focus on the core functionality of the tool.
-   **Clarity & Intuition:** Provide a clear interface that users can easily understand and use without a steep learning curve.
-   **Consistency:** Offer a unified brand experience by using the same design language (colors, fonts, layout, component styles) across all Stella tool pages.
-   **Friendliness & Reliability:** Convey a warm and approachable atmosphere, much like the logo, and build an impression of a stable and trustworthy tool.
-   **User-Focused:** Prioritize the user's convenience and efficiency above all else, with no ads or distracting elements.

### 2. Layout & Structure

**Overall Structure:**

-   **Header:** Keep it minimal. Place the Stella logo in the top-left corner (clickable to navigate to the main hub or an about page). If necessary, clearly display the current tool's name (e.g., "Stopwatch," "Timer") in the center of the page or next to the logo. Avoid complex menus.
-   **Main Content Area:** This is the most critical area of the page. The core functionality of the tool (time display, buttons, input fields, etc.) should be placed centrally to naturally draw the user's focus. Ensure ample whitespace to avoid a cluttered feeling.
-   **Footer:** Keep it concise. It may include copyright information (© 2024 Stella or developer's name), a link to an 'About/Support Stella' page, and, if needed, a list of links to other Stella tools.
-   **White Space:** Use generous spacing between content and elements to create a visually clean and organized feel. This reduces clutter and improves readability.
-   **Responsive Design:** Design responsively to ensure an optimized display on all devices, including desktops, tablets, and mobile phones. A mobile-first approach is recommended.

### 3. Color Palette

-   **Primary Color:**
    -   **Stella Blue:** Use the bright and friendly blue from the logo as the primary color. (Extract and define the exact Hex code, e.g., a tone similar to `#3B82F6`). Apply it to buttons, links, active states, and headings.
-   **Secondary Color (Optional, use minimally):**
    -   **Stella Yellow/Gold:** A bright yellow or gold, evoking the 'sparkle' in the logo, can be used sparingly for small accent elements (e.g., specific notifications, highlight icons). (e.g., `#FBBF24`). Be careful not to overuse it.
-   **Neutral Colors:**
    -   **White:** `#FFFFFF`. Primarily use as the background color to maximize cleanliness.
    -   **Light Gray:** A light gray like `#F3F4F6` or `#E5E7EB` can be used for card backgrounds, dividers, and inactive element backgrounds to add subtle depth.
    -   **Dark Gray / Black:** A dark gray shade like `#1F2937` or `#374151` should be used for body text to ensure readability. It provides a softer feel than pure black (`#000000`).

**Usage Guide:**
-   Maintain simplicity by limiting the color palette to 3-4 colors.
-   Ensure sufficient contrast between text and background to meet web accessibility standards (WCAG AA or higher).
-   Use the primary color, Stella Blue, consistently to represent the brand's visual identity.

### 4. Typography

-   **Font Family:**
    -   Use a clean, highly readable sans-serif web font that displays well in both English and Korean.
    -   **Recommendations:** Pretendard, SUIT, Noto Sans KR, or Inter (if English-focused).
    -   Maintain consistency by using no more than 1-2 font families.
-   **Size & Weight:**
    -   **Page Title (H1):** Largest size, Bold or Semi-bold weight (e.g., 24px - 36px).
    -   **Section Titles (H2, H3):** Medium size, Medium or Semi-bold weight (e.g., 18px - 24px).
    -   **Body/Descriptive Text:** Default size, Regular weight. Set an adequate line-height (e.g., 1.6 - 1.7) for readability. (e.g., 14px - 16px).
    -   **Tool Display Numbers (Timer/Stopwatch):** Use a larger size than the body text and a Medium or Bold weight for clarity. Consider a font optimized for number readability (a monospaced font if necessary) or adjust the size and weight of the primary font.
    -   **Button/Label Text:** Similar to or slightly smaller than body text, Medium or Semi-bold weight.
-   **Color:** Use Dark Gray / Black for body text. Stella Blue can be used for titles or highlighted text.

### 5. UI Components

-   **Buttons:**
    -   **Style:** Apply a slight border-radius to create soft, rounded corners that reflect the feel of the logo.
    -   **Primary Action Button:** Stella Blue background + White text.
    -   **Secondary Action Button:** White/Light Gray background + Stella Blue text and border, or a light gray background + dark gray text.
    -   **States:** Clearly differentiate between states: **Hover** (slightly darker or lighter), **Active** (subtle pressed effect or darker), and **Disabled** (light gray background and text, non-clickable).
    -   **Size:** Maintain consistent padding and height, ensuring they are large enough for easy tapping on mobile devices.
-   **Input Fields:**
    -   **Style:** Simple and clean design. Light gray border, slightly rounded corners. Provide clear placeholder text inside.
    -   **States:** Clearly differentiate between states: **Focus** (border color changes to Stella Blue) and **Error** (border color changes to red, with an error message displayed).
-   **Icons:**
    -   When necessary (e.g., play, pause, reset icons), use a single, consistent icon set (e.g., Feather Icons, Material Symbols - Outlined style).
    -   Choose icons that are simple, clear, and universally understood.
    -   Primarily use Stella Blue or Dark Gray for icon colors.

### 6. Logo Usage

-   **Placement:** Consistently place the logo in the top-left corner of the header. Ensure sufficient clear space around the logo so it doesn't overlap with other elements.
-   **Favicon:** Use the character part of the logo or a simplified version as the favicon.
-   **Consistency:** The full-color logo provided should be used by default. On specific backgrounds, a monochrome version (White or Stella Blue) may be considered, but only if it does not harm overall consistency.

### 7. Spacing & Alignment

-   **Spacing System:** Apply a consistent system (e.g., a 4px or 8px grid) for margins and padding between elements to create a visual rhythm and an organized look.
-   **Alignment:** Text should be left-aligned by default. Align elements (left, center, right) to create a sense of visual stability.

### 8. Tone & Microcopy

-   **Language:** Use a friendly, clear, concise, and helpful tone. Minimize the use of technical jargon.
-   **Instructional Text:** Write instructions to be simple and intuitive.
-   **Feedback:** Provide clear feedback for user actions (e.g., "Timer started," "Copied to clipboard").
