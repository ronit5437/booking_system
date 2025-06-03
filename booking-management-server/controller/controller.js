const fetch = require("node-fetch");

const BASE_API = "https://restful-booker.herokuapp.com/booking";

exports.getAllBookingsList = async (req, res) => {
  try {
    const response = await fetch(BASE_API);
    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }
    const data = await response.json();
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const response = await fetch(`${BASE_API}/${bookingId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }
    const data = await response.json();
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const body = req.body;
    const response = await fetch(BASE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error creating: ${response}`);
    }
    const data = await response.json();
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const body = req.body;
    const headers = {
      "Content-Type": "application/json",
      authorization: req.headers.authorization,
    };

    const response = await fetch(`${BASE_API}/${bookingId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error updating booking: ${response}`);
    }
    const data = await response.json();
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const headers = req.headers;
    const response = await fetch(`${BASE_API}/${bookingId}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      throw new Error(`Error deleting booking: ${response}`);
    }
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
