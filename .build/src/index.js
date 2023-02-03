"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config/config"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const requireDir = require('require-dir');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const app = (0, express_1.default)();
const port = config_1.default.port;
const dbConnection = config_1.default.DB.URI;
app.get('/', (req, res) => {
    res.send('EPSI API');
});
mongoose_1.default.connect(dbConnection, (err) => {
    if (err) {
        console.log("Error while connecting to DB", err);
    }
    else {
        console.log("Connected to DB", dbConnection);
    }
});
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.raw());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const allowedOrigins = ['*'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(upload.single('upload'));
app.use(routes_1.routes);
requireDir('./models');
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map