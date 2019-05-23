import sspSDK from '../sspSDK';


export default {
    get: async (req, res) => {
        try {
            let result = await sspSDK.get("/notes", { crossdomain: true });
            return result
        } catch (err) {
            console.log("Error", err);
        }
    },

    post: async (req, res) => {
        try {
            let result = await sspSDK.post("/newnote", req, { errorHandle: true });
            return result;
        } catch (err) {
            console.log("Error", err);
        }
    },

    put: async (req, res) => {
        try {
            let result = await sspSDK.put("/newnote", req, { errorHandle: true });
            return result;
        } catch (err) {
            console.log("Error", err);
        }
    },

    delete: async (req, res) => {
        try {
            let result = await sspSDK.delete("/newnote", req, { errorHandle: true });
            return result;
        } catch (err) {
            console.log("Error", err);
        }
    }
}
