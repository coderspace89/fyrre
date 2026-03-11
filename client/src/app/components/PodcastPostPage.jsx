"use client";

import React, { useState, useEffect } from "react";
import podcastPostPageStyles from "./PodcastPostPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const PodcastPostPage = ({ slug }) => {
  const postSlug = slug;

  const [headerSideData, setHeaderSideData] = useState(null);
  const [podcastPostData, setPodcastPostData] = useState([]);
  const [latestEpisodeData, setLatestEpisodeData] = useState([]);

  const headerSideQuery = qs.stringify(
    {
      populate: {
        listenOnPlatforms: {
          populate: ["icon"],
        },
        shareOptions: {
          populate: ["image"],
        },
        latestEpisodesSection: true,
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  const podcastQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: postSlug,
        },
      },
      populate: {
        image: true,
        audioFile: true,
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  // query for fetching latest episodes
  const numberOfEpisodesToShow = 3;
  const excludeEpisodeId = podcastPostData?.map((episode) => {
    return episode.id;
  });

  const currentEpisodeId = excludeEpisodeId.toString();

  const LatestEpisodesQuery = qs.stringify(
    {
      filters: {
        id: {
          $ne: currentEpisodeId,
        },
      },
      populate: {
        image: true,
        audioFile: true,
      },
      sort: ["createdAt:asc"],
      pagination: {
        pageSize: numberOfEpisodesToShow,
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  useEffect(() => {
    const fetchHeaderSideData = async () => {
      const response = await fetch(`/api/podcast-post-page?${headerSideQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setHeaderSideData(data?.data);
    };
    fetchHeaderSideData();
  }, []);

  useEffect(() => {
    const fetchPodcastPostData = async () => {
      const response = await fetch(`/api/podcasts?${podcastQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setPodcastPostData(data?.data);
    };
    fetchPodcastPostData();
  }, []);

  // latest episodes fetch
  useEffect(() => {
    const fetchLatestEpisodesData = async () => {
      const response = await fetch(`/api/podcasts?${LatestEpisodesQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setLatestEpisodeData(data?.data);
    };
    fetchLatestEpisodesData();
  }, [currentEpisodeId]);

  return (
    <section className={podcastPostPageStyles.container}>
      <Container>
        <Row className={podcastPostPageStyles.postHeaderContainer}>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <Link
                href={headerSideData?.goBackLink || "/podcast"}
                className="text-decoration-none"
              >
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.828 8.77797L9.192 14.142L7.778 15.556L0 7.77797L7.778 -3.05176e-05L9.192 1.41397L3.828 6.77797L16 6.77797V8.77797L3.828 8.77797Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className={podcastPostPageStyles.goBackText}>
                  {headerSideData?.goBackText}
                </span>
              </Link>
              <div>
                <h3 className={podcastPostPageStyles.pageLabelText}>
                  {headerSideData?.pageLabel}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={9}>
            {podcastPostData?.map((podcastPost) => (
              <Row key={podcastPost.id}>
                <Col lg={4}>
                  <div className={podcastPostPageStyles.podcastImageContainer}>
                    {podcastPost?.image && (
                      <Image
                        src={getStrapiMedia(podcastPost?.image?.url)}
                        width={podcastPost?.image?.width}
                        height={podcastPost?.image?.height}
                        alt={podcastPost?.image?.name}
                        className={podcastPostPageStyles.podcastImage}
                      />
                    )}
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute top-0 start-0`}
                    >
                      <h2 className={podcastPostPageStyles.imageHeading}>
                        Fyrre
                      </h2>
                      <h4 className={podcastPostPageStyles.imageSubheading}>
                        Podcast
                      </h4>
                    </div>
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute bottom-0 start-0`}
                    >
                      <span className={podcastPostPageStyles.episodeText}>
                        {podcastPost?.episodeNumber}
                      </span>
                    </div>
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute bottom-0 end-0`}
                    >
                      <svg
                        width="51"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="47.314"
                          width="50.7325"
                          height="3.38217"
                          fill="white"
                        />
                        <rect
                          x="47.3135"
                          width="3.38217"
                          height="50.7325"
                          fill="white"
                        />
                        <rect
                          x="4.06982"
                          y="6.61377"
                          width="3.38217"
                          height="62.5559"
                          transform="rotate(-45 4.06982 6.61377)"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={podcastPostPageStyles.ListenOnContainer}>
                    <ul className="list-unstyled">
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.ListenOnLabel}>
                          Listen On
                        </span>
                        <div
                          className={podcastPostPageStyles.shareLinksContainer}
                        >
                          {headerSideData?.listenOnPlatforms?.map(
                            (shareLink) => (
                              <Link
                                key={shareLink.id}
                                href={shareLink?.url}
                                target="_blank"
                              >
                                {shareLink?.icon && (
                                  <Image
                                    src={getStrapiMedia(shareLink?.icon?.url)}
                                    width={shareLink?.icon?.width}
                                    height={shareLink?.icon?.height}
                                    alt={shareLink?.icon?.name}
                                  />
                                )}
                              </Link>
                            ),
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-unstyled">
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.authorListLabel}>
                          Date
                        </span>
                        <span className={podcastPostPageStyles.authorListText}>
                          {formatDate(podcastPost?.publicationDate)}
                        </span>
                      </li>
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.authorListLabel}>
                          Duration
                        </span>
                        <span className={podcastPostPageStyles.authorListText}>
                          {podcastPost?.duration}
                        </span>
                      </li>
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.authorListLabel}>
                          Share
                        </span>
                        <div
                          className={podcastPostPageStyles.socialLinksContainer}
                        >
                          {headerSideData?.shareOptions?.map((socialLink) => (
                            <Link key={socialLink.id} href={socialLink?.url}>
                              {socialLink?.image && (
                                <Image
                                  src={getStrapiMedia(socialLink?.image?.url)}
                                  width={socialLink?.image?.width}
                                  height={socialLink?.image?.height}
                                  alt={socialLink?.image?.name}
                                />
                              )}
                            </Link>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className={podcastPostPageStyles.markdownContainer}>
                    <h6 className={podcastPostPageStyles.episodeHeading}>
                      <span>Episode </span>
                      {podcastPost?.episodeNumber.replace("Ep ", "")}
                    </h6>
                    <h1 className={podcastPostPageStyles.postTitle}>
                      {podcastPost?.title}
                    </h1>
                    <p className={podcastPostPageStyles.descriptionText}>
                      {podcastPost?.description}
                    </p>
                    <div>
                      {podcastPost?.audioFile && (
                        <div
                          className={podcastPostPageStyles.audioPlayerContainer}
                        >
                          <audio controls>
                            <source
                              src={getStrapiMedia(podcastPost.audioFile.url)}
                              type={podcastPost.audioFile.mime}
                            />
                            Your browser does not support the audio element.{" "}
                            {/* Fallback message */}
                          </audio>
                        </div>
                      )}
                    </div>
                    <ReactMarkdown>{podcastPost?.content}</ReactMarkdown>
                  </div>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
      <Container className={podcastPostPageStyles.containerRow}>
        <Row className={podcastPostPageStyles.sectionTitleContainer}>
          <Col lg={12}>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className={podcastPostPageStyles.sectionTitle}>
                {headerSideData?.latestEpisodesSection?.sectionTitle}
              </h2>
              <Link
                href={
                  headerSideData?.latestEpisodesSection?.viewAllLink ||
                  "/podcast"
                }
                className={podcastPostPageStyles.viewAllLink}
              >
                {headerSideData?.latestEpisodesSection?.viewAllText}
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.172 11.0002L10.808 5.63617L12.222 4.22217L20 12.0002L12.222 19.7782L10.808 18.3642L16.172 13.0002H4V11.0002H16.172Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          {latestEpisodeData?.map((podcast) => (
            <Col
              lg={4}
              key={podcast.id}
              className={podcastPostPageStyles.podcastCard}
            >
              <div>
                <Link
                  href={podcast?.slug}
                  className="text-decoration-none"
                  target="_blank"
                >
                  <div className={podcastPostPageStyles.podcastImageContainer}>
                    {podcast?.image && (
                      <Image
                        src={getStrapiMedia(podcast.image?.url)}
                        width={podcast?.image?.width}
                        height={podcast?.image?.height}
                        alt={podcast?.image?.name}
                        className={podcastPostPageStyles.podcastImage}
                      />
                    )}
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute top-0 start-0`}
                    >
                      <h2 className={podcastPostPageStyles.imageHeading}>
                        Fyrre
                      </h2>
                      <h4 className={podcastPostPageStyles.imageSubheading}>
                        Podcast
                      </h4>
                    </div>
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute bottom-0 start-0`}
                    >
                      <span className={podcastPostPageStyles.episodeText}>
                        {podcast?.episodeNumber}
                      </span>
                    </div>
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute bottom-0 end-0`}
                    >
                      <svg
                        width="51"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="47.314"
                          width="50.7325"
                          height="3.38217"
                          fill="white"
                        />
                        <rect
                          x="47.3135"
                          width="3.38217"
                          height="50.7325"
                          fill="white"
                        />
                        <rect
                          x="4.06982"
                          y="6.61377"
                          width="3.38217"
                          height="62.5559"
                          transform="rotate(-45 4.06982 6.61377)"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className={podcastPostPageStyles.podcastTitle}>
                      {podcast?.title}
                    </h3>
                  </div>
                  <div>
                    <span className={podcastPostPageStyles.dateTextContainer}>
                      <span>Date</span> {formatDate(podcast?.publicationDate)}
                    </span>
                    <span
                      className={podcastPostPageStyles.durationTextContainer}
                    >
                      <span>Duration</span> {podcast?.duration}
                    </span>
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PodcastPostPage;
