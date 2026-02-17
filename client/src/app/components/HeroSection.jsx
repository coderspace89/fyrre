"use client";

import React, { useState, useEffect } from "react";
import heroStyles from "./HeroSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        Hero: {
          populate: {
            image: true,
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

  if (
    !heroData?.newsTicker?.tickerItems ||
    heroData.newsTicker.tickerItems.length === 0
  ) {
    return null;
  }
  const allTickerItems = [
    ...heroData.newsTicker.tickerItems,
    ...heroData.newsTicker.tickerItems,
  ];

  return (
    <section className={heroStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={heroStyles.heroImageContainer}>
              {heroData?.image && (
                <Image
                  src={getStrapiMedia(heroData?.image?.url)}
                  width={heroData?.image?.width}
                  height={heroData?.image?.height}
                  alt={heroData?.image?.name}
                  className={heroStyles.heroImage}
                />
              )}
            </div>
            <div className={heroStyles["news-ticker-container"]}>
              <span className={heroStyles["news-ticker-label"]}>
                {heroData?.newsTicker?.title}
              </span>
              <div className={heroStyles["news-ticker-wrapper"]}>
                <div className={heroStyles["news-ticker-content"]}>
                  {allTickerItems.map((tickerItem, index) => (
                    <Link
                      key={`${tickerItem.id}-${index}`}
                      href={tickerItem.link}
                      className={heroStyles["ticker-item"]}
                    >
                      {tickerItem.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
