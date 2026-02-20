"use client";

import React, { useState, useEffect } from "react";
import authorStyles from "./AuthorSection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AuthorSection = () => {
  const [sectionHeaderData, setSectionHeaderData] = useState(null);
  const [authorsData, setAuthorsData] = useState(null);

  const sectionHeaderQuery = qs.stringify(
    {
      populate: {
        authorSection: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const authorsQuery = qs.stringify(
    {
      populate: {
        image: true,
        socialLinks: true,
      },
      sort: ["fullName:asc"],
      pagination: {
        page: 1,
        pageSize: 6,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSectionHeader = async () => {
      const response = await fetch(`/api/home-page?${sectionHeaderQuery}`);
      const data = await response.json();
      console.log(data?.data?.authorSection);
      setSectionHeaderData(data?.data?.authorSection);
    };
    fetchSectionHeader();
  }, []);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      const response = await fetch(`/api/authors?${authorsQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setAuthorsData(data?.data);
    };
    fetchAuthorsData();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
    </section>
  );
};

export default AuthorSection;
