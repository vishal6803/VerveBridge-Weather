/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-img":
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Stormclouds.jpg/250px-Stormclouds.jpg",
      },
    },
  },
  plugins: [],
};
