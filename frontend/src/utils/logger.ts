type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
}

class Logger {
  private static instance: Logger
  private logs: LogEntry[] = []
  private readonly maxLogs = 1000

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    }
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(entry)
    }
  }

  private sendToAnalytics(entry: LogEntry) {
    // Implement your analytics service here
    // Example: Google Analytics, Sentry, etc.
    console.log('Analytics:', entry)
  }

  info(message: string, data?: any) {
    const entry = this.createLogEntry('info', message, data)
    this.addLog(entry)
    console.info(message, data)
  }

  warn(message: string, data?: any) {
    const entry = this.createLogEntry('warn', message, data)
    this.addLog(entry)
    console.warn(message, data)
  }

  error(message: string, data?: any) {
    const entry = this.createLogEntry('error', message, data)
    this.addLog(entry)
    console.error(message, data)
  }

  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
  }
}

export const logger = Logger.getInstance() 