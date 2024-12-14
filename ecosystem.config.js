module.exports = {
    apps: [
      {
        name: "DEV-TOOLS-FRONTEND",
        script: "npm",
        args: "run defstart", // Adjust this based on your Vite start script
        instances: 1,
        exec_mode: "fork", // Use "cluster" if you want to run multiple instances
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
          // Add any other environment variables needed for production
        },
        // max_memory_restart: "1G", // Restart if the process exceeds 1GB of RAM
      },
    ],
  };
  