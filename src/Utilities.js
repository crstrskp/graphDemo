"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilities = void 0;
class Utilities {
    static async timedAwait(delegate, maxExecutionTime_ms) {
        return new Promise(resolve => {
            setTimeout(() => delegate(), maxExecutionTime_ms);
        });
    }
}
exports.Utilities = Utilities;
