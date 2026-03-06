"use client";

import React, { useState, useEffect } from "react";
import podcastPageStyles from "./PodcastPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const PodcastPage = () => {
  const [sectionHeaderData, setSectionHeaderData] = useState(null);
  const [podcastData, setPodcastData] = useState(null);

  const sectionHeaderQuery = qs.stringify(
    {
      populate: {
        podcastPageHeader: {
          populate: ["image"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const podcastQuery = qs.stringify(
    {
      populate: {
        image: true,
        audioFile: true,
      },
      sort: ["episodeNumber:desc"],
      pagination: {
        page: 1,
        pageSize: 5,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSectionHeader = async () => {
      const response = await fetch(`/api/podcast-page?${sectionHeaderQuery}`);
      const data = await response.json();
      console.log(data?.data?.podcastPageHeader);
      setSectionHeaderData(data?.data?.podcastPageHeader);
    };
    fetchSectionHeader();
  }, []);

  useEffect(() => {
    const fetchPodcastData = async () => {
      const response = await fetch(`/api/podcasts?${podcastQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setPodcastData(data?.data);
    };
    fetchPodcastData();
  }, []);

  return (
    <section className={podcastPageStyles.container}>
      <Container>
        <Row>
          <Col>
            <div>
              {sectionHeaderData?.image && (
                <Image
                  src={getStrapiMedia(sectionHeaderData?.image?.url)}
                  width={sectionHeaderData?.image?.width}
                  height={sectionHeaderData?.image?.height}
                  alt={sectionHeaderData?.image?.name}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PodcastPage;
