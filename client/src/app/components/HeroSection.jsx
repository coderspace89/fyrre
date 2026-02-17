"use client";

import React, { useState, useEffect } from "react";
import heroStyles from "./HeroSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Link from "next/link";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        Hero: {
          populate: {
            newsTicker: {
              populate: {
                tickerItems: true,
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchHero = async () => {
      const response = await fetch(`/api/home-page?${query}`);
      const data = await response.json();
      console.log(data?.data?.Hero);
      setHeroData(data?.data?.Hero);
    };
    fetchHero();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <div>
              <h2>{heroData?.title}</h2>
            </div>
            <div className={heroStyles["news-ticker-container"]}>
              <span className={heroStyles["news-ticker-label"]}>
                {heroData?.newsTicker?.title}
              </span>
              <div className={heroStyles["news-ticker-wrapper"]}>
                {heroData?.newsTicker?.tickerItems?.map((tickerItem) => (
                  <span
                    key={tickerItem.id}
                    className={heroStyles["news-ticker-content"]}
                  >
                    <Link
                      href={tickerItem.link}
                      className={heroStyles["ticker-item"]}
                    >
                      {tickerItem.text}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
