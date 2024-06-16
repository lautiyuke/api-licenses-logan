--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-16 12:21:42

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

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18746)
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
-- TOC entry 216 (class 1259 OID 18739)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 18738)
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
-- TOC entry 222 (class 1259 OID 18763)
-- Name: licenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.licenses (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    reason_id integer,
    other_reason character varying,
    start_date date NOT NULL,
    end_date date NOT NULL
);


ALTER TABLE public.licenses OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18762)
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
-- TOC entry 220 (class 1259 OID 18755)
-- Name: reasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reasons (
    id integer NOT NULL,
    reason character varying NOT NULL
);


ALTER TABLE public.reasons OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18754)
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
-- TOC entry 224 (class 1259 OID 18771)
-- Name: rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rules (
    id integer NOT NULL,
    country_id integer NOT NULL,
    function character varying NOT NULL
);


ALTER TABLE public.rules OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18770)
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
-- TOC entry 4867 (class 0 OID 18747)
-- Dependencies: 218
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries OVERRIDING SYSTEM VALUE VALUES (1, 'Argentina');
INSERT INTO public.countries OVERRIDING SYSTEM VALUE VALUES (2, 'Brasil');
INSERT INTO public.countries OVERRIDING SYSTEM VALUE VALUES (3, 'Chile');


--
-- TOC entry 4865 (class 0 OID 18739)
-- Dependencies: 216
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (1, 'Nicolas', 'Lopez', 'nlopez@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (2, 'Bárbara', 'Páez', 'bpaez@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (3, 'Nicolas', 'Martin de Nicolas', 'nmartin@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (4, 'Sebastian', 'Reingold', 'sreingold@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (5, 'Pablo', 'Valansi', 'pvalansi@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (6, 'Michelle', 'Zyserman', 'mzyserman@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (7, 'marcela', 'mosconi', 'mmosconi@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (8, 'Sol', 'Schmeigel', 'aschmeigel@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (9, 'Federico', 'Diaz Saubidet', 'fsaubidet@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (10, 'Manuel', 'Ramos Bernard', 'mramos@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (11, 'Maria Agustina', 'Dicarlo', 'adicarlo@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (12, 'Stephanie', 'Balea', 'sbalea@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (13, 'Paula', 'Furlong', 'pfurlong@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (14, 'Julieta', 'Malant', 'jmalant@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (15, 'Juan Martin', 'Rearte', 'jmrearte@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (16, 'Constanza', 'Pina', 'cpina@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (17, 'IGNACIO', 'QUINTANA', 'iquintana@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (18, 'Diego', 'Houssay', 'dhoussay@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (19, 'Natalia', 'Escual', 'nescual@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (20, 'Lucia', 'Olmos', 'lolmos@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (21, 'Leandro Matias', 'Uzunian', 'luzunian@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (22, 'Maria Luz', 'Giordano', 'mlgiordano@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (23, 'Ana Laura', 'Trozzo', 'atrozzo@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (24, 'Martha', 'Gomez', 'mbonilla@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (25, 'Mariela', 'Vivot', 'mvivot@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (26, 'Melany', 'Cittadini', 'mcittadini@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (27, 'Maria Agustina', 'Vuotto', 'avuotto@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (28, 'Damian', 'Marmorato', 'dmarmorato@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (29, 'Eliana', 'Bodichon', 'ebodichon@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (30, 'Francesco ', 'Simeone', 'fsimeone@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (31, 'Francisco ', 'Tomé ', 'ftome@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (32, 'Ana ', 'Souto', 'asouto@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (33, 'Maria Victoria', 'Tallarico', 'vtallarico@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (34, 'Juan Cruz', 'Ortigoza', 'jortigoza@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (35, 'SANDRA ', 'MUÑIZ', 'smuniz@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (36, 'Aranzasu Haydee', 'Arenas Ovalle', 'aarenas@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (37, 'Saildy', 'Bouroncle', 'sbouroncle@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (38, 'Alan Beryl', 'Cohn', 'acohn@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (39, 'Dominique', 'Mainhard Stukalsky', 'dmainhard@loganmedia.mobi');
INSERT INTO public.employees OVERRIDING SYSTEM VALUE VALUES (40, 'MARIA DEL ROSARIO', 'CORTES HERNANDEZ', 'rcortes@loganmedia.mobi');


--
-- TOC entry 4871 (class 0 OID 18763)
-- Dependencies: 222
-- Data for Name: licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, NULL, '2024-06-01', '2024-06-15');
INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (2, 2, 2, NULL, '2024-06-10', '2024-06-12');
INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (3, 3, NULL, 'Tengo un festival', '2024-06-05', '2024-06-06');
INSERT INTO public.licenses OVERRIDING SYSTEM VALUE VALUES (4, 4, 4, NULL, '2024-06-20', '2024-07-01');


--
-- TOC entry 4869 (class 0 OID 18755)
-- Dependencies: 220
-- Data for Name: reasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (1, 'Vacaciones');
INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (2, 'Viaje de trabajo');
INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (3, 'Luto');
INSERT INTO public.reasons OVERRIDING SYSTEM VALUE VALUES (4, 'Embarazo');


--
-- TOC entry 4873 (class 0 OID 18771)
-- Dependencies: 224
-- Data for Name: rules; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 217
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 3, true);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 215
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 40, true);


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 221
-- Name: licenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.licenses_id_seq', 4, true);


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 219
-- Name: reasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reasons_id_seq', 4, true);


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 223
-- Name: rules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rules_id_seq', 1, false);


--
-- TOC entry 4709 (class 2606 OID 18745)
-- Name: employees Employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 18753)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 18761)
-- Name: reasons licenseReasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reasons
    ADD CONSTRAINT "licenseReasons_pkey" PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 18769)
-- Name: licenses licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_pkey PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 18777)
-- Name: rules rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rules
    ADD CONSTRAINT rules_pkey PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 18783)
-- Name: licenses fk_licenses_employees_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT fk_licenses_employees_id FOREIGN KEY (employee_id) REFERENCES public.employees(id) NOT VALID;


--
-- TOC entry 4719 (class 2606 OID 18788)
-- Name: licenses fk_licenses_reason_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT fk_licenses_reason_id FOREIGN KEY (reason_id) REFERENCES public.reasons(id) NOT VALID;


--
-- TOC entry 4720 (class 2606 OID 18778)
-- Name: rules fk_rules_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rules
    ADD CONSTRAINT fk_rules_country_id FOREIGN KEY (country_id) REFERENCES public.countries(id) NOT VALID;


-- Completed on 2024-06-16 12:21:42

--
-- PostgreSQL database dump complete
--

