--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: tanks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tanks (
    id integer NOT NULL,
    nametank text NOT NULL,
    image_url text NOT NULL
);


ALTER TABLE public.tanks OWNER TO postgres;

--
-- Name: tanks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tanks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tanks_id_seq OWNER TO postgres;

--
-- Name: tanks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tanks_id_seq OWNED BY public.tanks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: tanks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tanks ALTER COLUMN id SET DEFAULT nextval('public.tanks_id_seq'::regclass);


--
-- Data for Name: tanks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tanks (id, nametank, image_url) FROM stdin;
1	БТ-5	https://static.encyclopedia.warthunder.com/images/ussr_bt_5.png
2	Т-26	https://static.encyclopedia.warthunder.com/images/ussr_t_26_1940.png
3	Т-26-4	https://static.encyclopedia.warthunder.com/images/ussr_t_26_4.png
4	СУ-5-1	https://static.encyclopedia.warthunder.com/images/ussr_su_5_1.png
5	ГАЗ-ААА (4М)	https://static.encyclopedia.warthunder.com/images/ussr_gaz_4m.png
6	БТ-7	https://static.encyclopedia.warthunder.com/images/ussr_bt_7_1937.png
7	Т-28 (1938)	https://static.encyclopedia.warthunder.com/images/ussr_t_28_1938.png
8	Т-60	https://static.encyclopedia.warthunder.com/images/ussr_t_60_1941.png
9	СУ-76М	https://static.encyclopedia.warthunder.com/images/ussr_su_76m_1943.png
10	ГАЗ-ААА (ДШК)	https://static.encyclopedia.warthunder.com/images/ussr_gaz_dshk.png
11	БТ-7М	https://static.encyclopedia.warthunder.com/images/ussr_bt_7_m.png
12	Т-28	https://static.encyclopedia.warthunder.com/images/ussr_t_28.png
13	Т-70	https://wiki-ru.warthunder.com/images/63e1b6623f84be0828b469cc7092976f.jpg
14	Т-26 (1 Гв.Т.Бр.)	https://static.encyclopedia.warthunder.com/images/ussr_t_26_1940_1st_gvtbr.png
15	Т-26Э	https://static.encyclopedia.warthunder.com/images/ussr_t_26e.png
16	БТ-7 TD	https://static.encyclopedia.warthunder.com/images/ussr_bt_7_1937_td.png
17	РБТ-5	https://static.encyclopedia.warthunder.com/images/ussr_rbt_5.png
18	Т-35	https://static.encyclopedia.warthunder.com/images/ussr_t_35.png
19	БА-11	https://static.encyclopedia.warthunder.com/images/ussr_ba_11.png
20	СУ-57	https://static.encyclopedia.warthunder.com/images/ussr_su_57.png
21	БМ-8-24	https://static.encyclopedia.warthunder.com/images/ussr_bm_8_24.png
22	T-III	https://static.encyclopedia.warthunder.com/images/ussr_pzkpfw_iii_ausf_j_l42.png
23	Т-50	https://static.encyclopedia.warthunder.com/images/ussr_t_50.png
24	Т-28Э	https://static.encyclopedia.warthunder.com/images/ussr_t_28e.png
25	Т-80	https://static.encyclopedia.warthunder.com/images/ussr_t_80.png
26	ЗиС-30	https://static.encyclopedia.warthunder.com/images/ussr_zis_30.png
27	ГАЗ-ММ (72-К)	https://static.encyclopedia.warthunder.com/images/ussr_gaz_mm_72k.png
28	Т-34 (1940)	https://static.encyclopedia.warthunder.com/images/ussr_t_34_1941_l_11.png
29	КВ-1 (Л-11)	https://static.encyclopedia.warthunder.com/images/ussr_kv_1_l_11.png
30	СУ-122	https://static.encyclopedia.warthunder.com/images/ussr_su_122.png
31	БТР-152А	https://static.encyclopedia.warthunder.com/images/ussr_btr_152a.png
32	Т-34 (1942)	https://static.encyclopedia.warthunder.com/images/ussr_t_34_1942.png
33	КВ-1С	https://static.encyclopedia.warthunder.com/images/ussr_kv_1s.png
34	ЯГ-10 (29-К)	https://static.encyclopedia.warthunder.com/images/ussr_zsu_29k.png
35	ЗиС-12 (94-КМ)	https://static.encyclopedia.warthunder.com/images/ussr_zis_12_94km_1945.png
36	ЗУТ-37	https://static.encyclopedia.warthunder.com/images/ussr_zut_37.png
37	СУ-76М (5гв.Кав.Корп)	https://static.encyclopedia.warthunder.com/images/ussr_su_76m_5st_kav_corps.png
38	Т-126	https://wiki-ru.warthunder.com/images/7a478991904138416f22c5caa1bd21d7.jpg
39	СУ-76Д	https://static.encyclopedia.warthunder.com/images/ussr_su_76d.png
40	Т-34 (Прототип)	https://static.encyclopedia.warthunder.com/images/ussr_t_34_1940_l_11.png
41	М-3 Средний	https://static.encyclopedia.warthunder.com/images/ussr_m3c.png
42	БТ-7А (Ф-32)	https://static.encyclopedia.warthunder.com/images/ussr_bt_7a_f32.png
43	БМ-13Н	https://static.encyclopedia.warthunder.com/images/ussr_bm_13n.png
44	СМК	https://static.encyclopedia.warthunder.com/images/ussr_smk.png
45	МК-II Матильда	https://static.encyclopedia.warthunder.com/images/ussr_a_12_mk_2_matilda_2a_f96.png
46	Т-34 (1 Гв.Т.Бр.)	https://static.encyclopedia.warthunder.com/images/ussr_t_34_1941_cast_turret.png
47	МК-IX Валентин	https://static.encyclopedia.warthunder.com/images/uk_valentine_mk_9.png
48	Т-34Э	https://static.encyclopedia.warthunder.com/images/ussr_t_34e.png
49	СУ-85А	https://static.encyclopedia.warthunder.com/images/ussr_su_85a.png
50	Т-34-57	https://static.encyclopedia.warthunder.com/images/ussr_t_34_1941_57.png
51	КВ-1 (ЗиС-5)	https://static.encyclopedia.warthunder.com/images/ussr_kv_1_zis_5.png
52	АСУ-57	https://static.encyclopedia.warthunder.com/images/ussr_asu_57.png
53	СУ-152	https://static.encyclopedia.warthunder.com/images/ussr_su_152.png
54	БТР-152Д	https://static.encyclopedia.warthunder.com/images/ussr_btr_152d.png
55	Т-34-85 (Д-5Т)	https://static.encyclopedia.warthunder.com/images/ussr_t_34_85_d_5t.png
56	ИС-1	https://static.encyclopedia.warthunder.com/images/ussr_is_1.png
57	ПТ-76Б	https://static.encyclopedia.warthunder.com/images/ussr_pt_76b.png
58	СУ-85М	https://static.encyclopedia.warthunder.com/images/ussr_su_85m.png
59	БМ-31-12	https://static.encyclopedia.warthunder.com/images/ussr_bm_31_12.png
60	КВ-2 (1940)	https://static.encyclopedia.warthunder.com/images/ussr_kv_2_1940.png
61	Т-34-57 (1943)	https://static.encyclopedia.warthunder.com/images/ussr_t_34_57_1943.png
62	КВ-7 (У-13)	https://static.encyclopedia.warthunder.com/images/ussr_kv_7_u13.png
63	M4A2	https://static.encyclopedia.warthunder.com/images/ussr_m4a2_76w_sherman.png
64	КВ-1Э	https://static.encyclopedia.warthunder.com/images/ussr_kv_1e.png
65	Phòng không T-34	https://static.encyclopedia.warthunder.com/images/ussr_type_65_aa.png
66	СУ-100Y	https://static.encyclopedia.warthunder.com/images/ussr_su_100y.png
67	КВ-2 (ЗиС-6)	https://static.encyclopedia.warthunder.com/images/ussr_kv_2_zis_6.png
68	Т-34-85	https://static.encyclopedia.warthunder.com/images/ussr_t_34_85_zis_53.png
69	ИС-2	https://static.encyclopedia.warthunder.com/images/ussr_is_2_1943.png
70	АСУ-85	https://static.encyclopedia.warthunder.com/images/ussr_asu_85.png
71	ИСУ-122С	https://static.encyclopedia.warthunder.com/images/ussr_isu_122s.png
72	БТР-ЗД	https://static.encyclopedia.warthunder.com/images/ussr_btr_zd.png
73	Т-44	https://static.encyclopedia.warthunder.com/images/ussr_t_44.png
74	ИС-2 (1944)	https://static.encyclopedia.warthunder.com/images/ussr_is_2_1944.png
75	СУ-100П	https://static.encyclopedia.warthunder.com/images/ussr_su_100p.png
76	2С1	https://static.encyclopedia.warthunder.com/images/ussr_2s1.png
77	M53-59	https://static.encyclopedia.warthunder.com/images/ussr_m53_59.png
78	КВ-122	https://static.encyclopedia.warthunder.com/images/ussr_kv_122.png
79	КВ-220	https://static.encyclopedia.warthunder.com/images/ussr_kv_220.png
80	Т-34-85Э	https://static.encyclopedia.warthunder.com/images/ussr_t_34_85e.png
81	T-V	https://wiki-ru.warthunder.com/images/8f0a526ba1d73e2fe78cd54068492040.jpg
82	СУ-122П	https://static.encyclopedia.warthunder.com/images/ussr_su_122p.png
83	ИС-2 Месть	https://static.encyclopedia.warthunder.com/images/ussr_is_2_1944_revenge.png
84	Т-44-122	https://static.encyclopedia.warthunder.com/images/ussr_t_44_122.png
85	Объект 248	https://static.encyclopedia.warthunder.com/images/ussr_object_248.png
86	Т-34-100	https://static.encyclopedia.warthunder.com/images/ussr_t_34_100.png
87	Type 62	https://static.encyclopedia.warthunder.com/images/ussr_type_62.png
88	Т-44-100	https://static.encyclopedia.warthunder.com/images/ussr_t_44_100.png
89	ИС-3	https://static.encyclopedia.warthunder.com/images/ussr_is_3.png
90	БТР-80А	https://static.encyclopedia.warthunder.com/images/ussr_btr_80a.png
91	СУ-122-54	https://static.encyclopedia.warthunder.com/images/ussr_su_122_54.png
92	ЗСУ-57-2	https://static.encyclopedia.warthunder.com/images/ussr_zsu_57_2.png
93	Т-54 (1947)	https://static.encyclopedia.warthunder.com/images/ussr_t_54_1947.png
94	ИС-4М	https://static.encyclopedia.warthunder.com/images/ussr_is_4m.png
95	БМП-1	https://static.encyclopedia.warthunder.com/images/ussr_bmp_1.png
96	Объект 268	https://static.encyclopedia.warthunder.com/images/ussr_object_268.png
97	ЗСУ-23-4М2	https://static.encyclopedia.warthunder.com/images/ussr_zsu_23_4m2.png
98	ЗСУ-37-2	https://static.encyclopedia.warthunder.com/images/ussr_zsu_37_2.png
99	ИС-6	https://static.encyclopedia.warthunder.com/images/ussr_is_6.png
100	Т-10A	https://static.encyclopedia.warthunder.com/images/ussr_t_10a.png
101	Объект 120	https://static.encyclopedia.warthunder.com/images/ussr_object_120.png
102	ПТ-76-57	https://static.encyclopedia.warthunder.com/images/ussr_pt_76_57.png
103	ТО-55	https://static.encyclopedia.warthunder.com/images/ussr_to_55.png
104	Т-55А	https://static.encyclopedia.warthunder.com/images/ussr_t_55a.png
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name) FROM stdin;
\.


--
-- Name: tanks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tanks_id_seq', 104, true);


--
-- Name: tanks tanks_nametank_image_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tanks
    ADD CONSTRAINT tanks_nametank_image_url_key UNIQUE (nametank, image_url);


--
-- Name: tanks tanks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tanks
    ADD CONSTRAINT tanks_pkey PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

