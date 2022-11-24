import app from "./api/app";
const PORT = process.env.PORT || 5050;

async function main() {
    app.listen(PORT, () =>
        console.log(`Started API server at http://localhost:${PORT}`)
    );
}

main();
