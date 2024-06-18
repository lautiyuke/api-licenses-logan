--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-17 21:03:21

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


CREATE TYPE public.license_state AS ENUM (
    'waiting',
    'aproved',
    'rejected',
    'taken'
);


ALTER TYPE public.license_state OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 18804)
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 18809)
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.countries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 18810)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying,
    access integer DEFAULT 1 NOT NULL,
    country_id integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18815)
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employees ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 18816)
-- Name: licenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.licenses (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    reason_id integer,
    other_reason character varying,
    start_date date NOT NULL,
    end_date date NOT NULL,
    state public.license_state DEFAULT 'waiting'::public.license_state NOT NULL
);


ALTER TABLE public.licenses OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18821)
-- Name: licenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.licenses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 18822)
-- Name: reasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reasons (
    id integer NOT NULL,
    reason character varying NOT NULL
);


ALTER TABLE public.reasons OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18886)
-- Name: reasons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reasons ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 18828)
-- Name: rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rules (
    id integer NOT NULL,
    country_id integer NOT NULL,
    rule character varying NOT NULL
);


ALTER TABLE public.rules OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 18889)
-- Name: rules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rules ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4871 (class 0 OID 18804)
-- Dependencies: 215
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries OVERRIDING SYSTEM VALUE VALUES (1, 'Argentina');
INSERT INTO public.countries OVERRIDING SYSTEM VALUE VALUES (2, 'Brasil');
INSERT INTO public.countries OVERRIDING SYSTEM VALUE VALUES (3, 'Chile');


--
-- TOC entry 4873 (class 0 OID 18810)
-- Dependencies: 217
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (1, 'adm', 'adm', 'adm@gmail.com', '$2b$10$JI4pvYcUq8YfPoNj0hwTsu0QjDIkoSf2wW5XlPtXtyuFq0QcTMroW', 3, 1);
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (2, 'Nicolas', 'Lopez', 'nlopez@loganmedia.mobi', '$2b$10$fqKaxoP77FTNMgP.bvsE3OnfmN4fnv8PS2Exlqk3ZnKWOG37yP8OO', 1, 1);
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (3, 'Bárbara', 'Páez', 'bpaez@loganmedia.mobi', '$2b$10$zXP1ZS/QM4ocIzvNR6EDFObJT/WhSOlljeorOQ53RVrJhM7CU2OV.', 1, 1);
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (4, 'Nicolas', 'Martin de Nicolas', 'nmartin@loganmedia.mobi', '$2b$10$FUnUuBXw3pDsfM63uUVJ0.9FdP1Xf3in7khkIUgX/fHbs8TWbjUEe', 1, 1);
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (5, 'Sebastian', 'Reingold', 'sreingold@loganmedia.mobi', '$2b$10$mYl1X0xPN0Y1C7/Lua444.tgRByC42PMSaUoyTuSeQBjG2kCB8a7y', 1, 1);


--
-- TOC entry 4875 (class 0 OID 18816)
-- Dependencies: 219
-- Data for Name: licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (1, 2, 1, NULL, '2024-06-01', '2024-06-15', 'waiting');
INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (2, 3, 2, NULL, '2024-06-10', '2024-06-12', 'waiting');
INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (3, 4, NULL, 'Tengo un festival', '2024-06-05', '2024-06-06', 'waiting');
INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (4, 5, 4, NULL, '2024-06-20', '2024-07-01', 'waiting');


--
-- TOC entry 4877 (class 0 OID 18822)
-- Dependencies: 221
-- Data for Name: reasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (1, 'Vacaciones');
INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (2, 'Viaje de trabajo');
INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (3, 'Luto');
INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (4, 'Embarazo');


--
-- TOC entry 4878 (class 0 OID 18828)
-- Dependencies: 222
-- Data for Name: rules; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 216
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 3, true);


--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 218
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 5, true);


--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 220
-- Name: licenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.licenses_id_seq', 4, true);


--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 223
-- Name: reasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reasons_id_seq', 4, true);


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 224
-- Name: rules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rules_id_seq', 1, false);


--
-- TOC entry 4717 (class 2606 OID 18835)
-- Name: employees Employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 18837)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 18839)
-- Name: reasons licenseReasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reasons
    ADD CONSTRAINT "licenseReasons_pkey" PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 18841)
-- Name: licenses licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 18843)
-- Name: rules rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rules
    ADD CONSTRAINT rules_pkey PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 18880)
-- Name: employees fk_employees_countries_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT fk_employees_countries_id FOREIGN KEY (country_id) REFERENCES public.countries(id) NOT VALID;


--
-- TOC entry 4725 (class 2606 OID 18844)
-- Name: licenses fk_licenses_employees_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT fk_licenses_employees_id FOREIGN KEY (employee_id) REFERENCES public.employees(id) NOT VALID;


--
-- TOC entry 4726 (class 2606 OID 18849)
-- Name: licenses fk_licenses_reason_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT fk_licenses_reason_id FOREIGN KEY (reason_id) REFERENCES public.reasons(id) NOT VALID;


--
-- TOC entry 4727 (class 2606 OID 18854)
-- Name: rules fk_rules_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rules
    ADD CONSTRAINT fk_rules_country_id FOREIGN KEY (country_id) REFERENCES public.countries(id) NOT VALID;


-- Completed on 2024-06-17 21:03:21

--
-- PostgreSQL database dump complete
--

