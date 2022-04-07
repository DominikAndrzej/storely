--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_group (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.app_group OWNER TO postgres;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_user (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    is_enabled boolean NOT NULL,
    name character varying(255),
    password character varying(255),
    registered timestamp without time zone NOT NULL,
    role integer,
    surname character varying(255),
    group_id bigint
);


ALTER TABLE public.app_user OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_sequence OWNER TO postgres;

--
-- Name: group_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_sequence OWNER TO postgres;

--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id bigint NOT NULL,
    code bigint,
    quantity integer,
    item_template_id bigint,
    added date
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: item_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_group (
    group_id bigint NOT NULL,
    item_id bigint NOT NULL
);


ALTER TABLE public.item_group OWNER TO postgres;

--
-- Name: item_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_sequence OWNER TO postgres;

--
-- Name: item_template; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_template (
    id bigint NOT NULL,
    critical_quantity integer,
    description character varying(255),
    is_returnable boolean NOT NULL,
    model character varying(255),
    name character varying(255),
    time_limit time without time zone,
    category_id bigint
);


ALTER TABLE public.item_template OWNER TO postgres;

--
-- Name: item_template_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_template_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_template_sequence OWNER TO postgres;

--
-- Name: rental; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental (
    id bigint NOT NULL,
    is_returnable boolean NOT NULL,
    quantity integer,
    rent_date timestamp without time zone,
    return_date timestamp without time zone,
    item_id bigint,
    user_id bigint
);


ALTER TABLE public.rental OWNER TO postgres;

--
-- Name: rental_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rental_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rental_sequence OWNER TO postgres;

--
-- Name: user_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_sequence OWNER TO postgres;

--
-- Data for Name: app_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_group (id, name) FROM stdin;
1	Pracownicy biurowi
\.


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_user (id, email, is_enabled, name, password, registered, role, surname, group_id) FROM stdin;
1	jack123@gmail.com	t	jack	$2a$10$Zdb86intgAU4zBOJlYwHaee8uMVB/zV/DOU8mpb4cvPdC63SPD2Cy	2022-02-07 12:40:50.266574	2	jackson	1
3	1234@gmail.com	t	jackkk	$2a$10$cz3tYwTo8.YPeuvz6XEkDeNsHFW5kyzehKTWGhBWb/RYXMxXfjDz6	2022-02-07 15:32:11.380916	0	hehe	\N
2	jack@gmail.com	t	jackkk	$2a$10$ubRZxWhuBsC76AjrP9gjQeTf5h37y1HR0Orz8dAGCVUwYXxZek04S	2022-02-07 15:29:07.45229	0	hehe	\N
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	Narzedzia
2	Wiertarki i wkretarki
3	Jedzenie i napoje
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (id, code, quantity, item_template_id, added) FROM stdin;
1	123123	-1	1	\N
2	1231233	-1	1	\N
3	1233123	-1	1	\N
4	1231323	-1	1	\N
5	1	-1	1	\N
6	2	-1	1	\N
7	3	-1	1	\N
8	4	-1	1	\N
9	5	-1	1	\N
10	6	-1	1	\N
11	7	-1	1	\N
12	8	-1	1	\N
13	9	-1	1	\N
14	11	-1	1	\N
15	12	-1	1	\N
16	133332	52	2	\N
\.


--
-- Data for Name: item_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_group (group_id, item_id) FROM stdin;
1	1
\.


--
-- Data for Name: item_template; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_template (id, critical_quantity, description, is_returnable, model, name, time_limit, category_id) FROM stdin;
1	15	super wietarka	t	wiertakrka GHB600	Wiertarka Bosch	\N	1
2	50	woda	f	cisowianka 1,5l	Woda Cisowianka	\N	3
\.


--
-- Data for Name: rental; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rental (id, is_returnable, quantity, rent_date, return_date, item_id, user_id) FROM stdin;
1	t	-1	2022-02-07 23:51:22.370109	\N	1	1
\.


--
-- Name: category_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_sequence', 1, false);


--
-- Name: group_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_sequence', 1, false);


--
-- Name: item_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_sequence', 1, false);


--
-- Name: item_template_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_template_sequence', 1, false);


--
-- Name: rental_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rental_sequence', 1, true);


--
-- Name: user_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sequence', 3, true);


--
-- Name: app_group app_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_group
    ADD CONSTRAINT app_group_pkey PRIMARY KEY (id);


--
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: item item_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_code_key UNIQUE (code);


--
-- Name: item_group item_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_group
    ADD CONSTRAINT item_group_pkey PRIMARY KEY (group_id, item_id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: item_template item_template_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_template
    ADD CONSTRAINT item_template_pkey PRIMARY KEY (id);


--
-- Name: rental rental_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT rental_pkey PRIMARY KEY (id);


--
-- Name: app_user uk_1j9d9a06i600gd43uu3km82jw; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT uk_1j9d9a06i600gd43uu3km82jw UNIQUE (email);


--
-- Name: item fk4rh59jg0pnnm6muyyon9udcjj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk4rh59jg0pnnm6muyyon9udcjj FOREIGN KEY (item_template_id) REFERENCES public.item_template(id);


--
-- Name: rental fk911q06eeyv9fjyckbb54v7owu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT fk911q06eeyv9fjyckbb54v7owu FOREIGN KEY (user_id) REFERENCES public.app_user(id);


--
-- Name: app_user fkgapitm7xqjx9d3ufgnglnm9c6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT fkgapitm7xqjx9d3ufgnglnm9c6 FOREIGN KEY (group_id) REFERENCES public.app_group(id);


--
-- Name: rental fkhrbbsnujnapdkl6miye8vxb0p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT fkhrbbsnujnapdkl6miye8vxb0p FOREIGN KEY (item_id) REFERENCES public.item(id);


--
-- Name: item_group fkqufor7ip40cdup31mmye928ry; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_group
    ADD CONSTRAINT fkqufor7ip40cdup31mmye928ry FOREIGN KEY (group_id) REFERENCES public.item_template(id);


--
-- Name: item_group fksql8hbb0hyybahw59qcvksxv2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_group
    ADD CONSTRAINT fksql8hbb0hyybahw59qcvksxv2 FOREIGN KEY (item_id) REFERENCES public.app_group(id);


--
-- Name: item_template fkt1bsgdm5lp1kac3mv400phkxi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_template
    ADD CONSTRAINT fkt1bsgdm5lp1kac3mv400phkxi FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- PostgreSQL database dump complete
--

