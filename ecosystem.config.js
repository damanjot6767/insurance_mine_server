module.exports = {
  apps: [
    {
      name: 'insurance-mine',
      script: './dist/index.js', // Path to the compiled JavaScript file
      watch: false,
      max_memory_restart: '300M',
      instances: 1,
      autorestart: true,
      exec_mode: 'cluster'
    },
    {
      name: 'cpu-monitor',
      script: './dist/cpu-monitor.js', // Path to the compiled JavaScript file
      watch: false,
      max_memory_restart: '300M',
      instances: 1,
      autorestart: true,
      exec_mode: 'cluster'
    }
  ]
};
