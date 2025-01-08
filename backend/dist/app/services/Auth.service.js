"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'not good';
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
    }
    generateToken(userId) {
        return jwt.sign({ id: userId }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
    }
    verifyToken(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
    decodeToken(token) {
        const tokenPart = token.split(' ')[1];
        return jwt.decode(tokenPart);
    }
}
exports.AuthService = AuthService;
