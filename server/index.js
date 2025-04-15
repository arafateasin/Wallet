const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "04d74f0af88261d46986ca4e8210a26591be41e628fa5fa3145aa6f77fd540655b76dd4d30b92c6aedad68097154060bc20a930f4e3737c1ab2419e33fe49668e2": 100, //danny's address
  "04313d12967798f639ddb4a7bda395cd5dfbbe7265fba3584e4d53195c7114ba249337ab028df27934fe0f41f672877391062a45a8046b694f8761ac3ae71bafc7": 50, //mike's address
  "04a781cae0a81c14336feff538a8893fc2fce5e57efddcdf5e42bb0dcd2818086a1d67d24efb8383ce6b03d89ccddbe77b7858cc61a9075aadf360b9bada63c83b": 75, //james's address
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  // Recover the public key from the signature
  const message = `Send ${amount} to ${recipient}`;
  const messageHash = utf8ToBytes(message);

  try {
    const publicKey = secp.recoverPublicKey(
      messageHash,
      signature,
      recoveryBit
    );
    const recoveredAddress = toHex(publicKey);

    // Verify the recovered address matches the sender
    if (recoveredAddress !== sender) {
      return res.status(400).send({ message: "Invalid signature!" });
    }

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    res.status(400).send({ message: "Error verifying signature!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
