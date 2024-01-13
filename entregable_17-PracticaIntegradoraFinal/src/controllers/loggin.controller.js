export default class LogginController {
    constructor() {}

  async getFatal(req, res) {
    req.logger.fatal('<span style="color:red"> FATAL </span><br/>')
    res.send("Fatal logger")
  }

  async getError(req, res) {
    req.logger.error('<span style="color:yellow"> ERROR </span><br/>')
    res.send("Error logger")
  }

  async getWarning(req, res) {
    req.logger.warning('<span style="color:cyan"> WARNING </span><br/>'),
    res.send("Warning logger")
  }

  async getInfo(req, res) {
    req.logger.info('<span style="color:blue"> INFO </span><br/>'),
    res.send("Info logger")
  }

  async getDebug(req, res) {
    req.logger.debug("Debug"),
    res.send("Debug logger")
  }

}