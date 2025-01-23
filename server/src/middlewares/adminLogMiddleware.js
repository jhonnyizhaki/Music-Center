import AdminLog from "../models/adminLogModel.js";

export const logAdminAction = (action) => {
  return async (req, res, next) => {
    const originalSend = res.send;

    res.send = async function (data) {
      res.send = originalSend;

      try {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          await AdminLog.create({
            adminId: req.user._id,
            action,
            details: {
              method: req.method,
              path: req.path,
              body: req.body,
              params: req.params,
              query: req.query,
              response: JSON.parse(data),
            },
            ip: req.ip,
            userAgent: req.get("user-agent"),
          });
        }
      } catch (error) {
        console.error("Error logging admin action:", error);
      }

      return originalSend.call(this, data);
    };

    next();
  };
};
