export const theme = {
  primary: '#333333',
  secondary: '#f5f5f5',
  accent: '#4a4a4a',
  text: '#333333',
  lightText: '#666666',
  border: '#e0e0e0',
  buttonBg: '#f0f0f0',
  buttonHover: '#e0e0e0',
};

export default {
    pages: [
		{
		  path: "/applyManagement",
          name: "applyManagement",
		  component: () => import("./views/index.vue"),
		},
	  ]
};
