"use client";

import React, { useState, useEffect } from "react";
import authorsPostPageStyles from "./AuthorsPostPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const AuthorsPostPage = ({ slug }) => {
  const postSlug = slug;

  return <div>AuthorsPostPage</div>;
};

export default AuthorsPostPage;
