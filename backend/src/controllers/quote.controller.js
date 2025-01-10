import express from "express";
import fetch from "node-fetch";

export const getQuote = async (req, res) => {
  const response = await fetch("https://zenquotes.io/api/today");
  const data = await response.json();
  res.json(data);
};


