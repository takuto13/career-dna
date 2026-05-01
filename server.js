const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const diagnoseHandler = require("./api/diagnose");
const contactHandler = require("./api/contact");
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json"
};

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found: " + filePath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "text/plain";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function createResAdapter(res) {
  return {
    setHeader(name, value) {
      res.setHeader(name, value);
    },
    status(code) {
      res.statusCode = code;
      return this;
    },
    json(payload) {
      if (!res.headersSent) res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
    },
    end(payload) {
      res.end(payload);
    }
  };
}

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split("?")[0];

  if (urlPath === "/api/diagnose" && req.method === "POST") {
    try {
      req.body = await parseBody(req);
      await diagnoseHandler(req, createResAdapter(res));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error", detail: String(e) }));
    }
    return;
  }

  if (urlPath === "/api/contact" && req.method === "POST") {
    try {
      req.body = await parseBody(req);
      await contactHandler(req, createResAdapter(res));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error", detail: String(e) }));
    }
    return;
  }

  let filePath;
  if (urlPath === "/" || urlPath === "/index.html") {
    filePath = path.join(PUBLIC_DIR, "index.html");
  } else if (urlPath === "/result.html") {
    filePath = path.join(PUBLIC_DIR, "result.html");
  } else {
    filePath = path.join(PUBLIC_DIR, urlPath);
  }

  serveFile(res, filePath);
});

server.listen(3000, () => {
  console.log("サーバー起動: http://localhost:3000");
});
