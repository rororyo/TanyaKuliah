PGDMP     5                     |            TanyaKuliah    15.4    15.4 0    4           0    0    ENCODING    ENCODING         SET client_encoding = 'LATIN1';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    16456    TanyaKuliah    DATABASE     �   CREATE DATABASE "TanyaKuliah" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "TanyaKuliah";
                postgres    false            �            1259    16561    articles    TABLE     �   CREATE TABLE public.articles (
    id integer NOT NULL,
    title text,
    picture text,
    content text,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.articles;
       public         heap    postgres    false            �            1259    16560    articles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.articles_id_seq;
       public          postgres    false    224            8           0    0    articles_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;
          public          postgres    false    223            �            1259    16541    group_messages    TABLE     �   CREATE TABLE public.group_messages (
    id integer NOT NULL,
    user_id integer,
    group_id integer,
    message text,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE public.group_messages;
       public         heap    postgres    false            �            1259    16540    group_messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.group_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.group_messages_id_seq;
       public          postgres    false    222            9           0    0    group_messages_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.group_messages_id_seq OWNED BY public.group_messages.id;
          public          postgres    false    221            �            1259    16519    groups    TABLE     M   CREATE TABLE public.groups (
    id integer NOT NULL,
    group_name text
);
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    16518    groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.groups_id_seq;
       public          postgres    false    219            :           0    0    groups_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;
          public          postgres    false    218            �            1259    16485    messages    TABLE     �   CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.messages;
       public         heap    postgres    false            �            1259    16484    message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.message_id_seq;
       public          postgres    false    217            ;           0    0    message_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.message_id_seq OWNED BY public.messages.id;
          public          postgres    false    216            �            1259    16527    user_groups    TABLE     O   CREATE TABLE public.user_groups (
    user_id integer,
    group_id integer
);
    DROP TABLE public.user_groups;
       public         heap    postgres    false            �            1259    16458    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email text,
    password text,
    username text,
    connects integer DEFAULT 1,
    role character varying(50) DEFAULT 'member'::character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16457    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            <           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    16564    articles id    DEFAULT     j   ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);
 :   ALTER TABLE public.articles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    16544    group_messages id    DEFAULT     v   ALTER TABLE ONLY public.group_messages ALTER COLUMN id SET DEFAULT nextval('public.group_messages_id_seq'::regclass);
 @   ALTER TABLE public.group_messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16522 	   groups id    DEFAULT     f   ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);
 8   ALTER TABLE public.groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    16488    messages id    DEFAULT     i   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            }           2604    16461    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            1          0    16561    articles 
   TABLE DATA                 public          postgres    false    224   �3       /          0    16541    group_messages 
   TABLE DATA                 public          postgres    false    222   �3       ,          0    16519    groups 
   TABLE DATA                 public          postgres    false    219   �3       *          0    16485    messages 
   TABLE DATA                 public          postgres    false    217   4       -          0    16527    user_groups 
   TABLE DATA                 public          postgres    false    220   6       (          0    16458    users 
   TABLE DATA                 public          postgres    false    215    6       =           0    0    articles_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.articles_id_seq', 1, false);
          public          postgres    false    223            >           0    0    group_messages_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.group_messages_id_seq', 1, false);
          public          postgres    false    221            ?           0    0    groups_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.groups_id_seq', 1, false);
          public          postgres    false    218            @           0    0    message_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.message_id_seq', 20, true);
          public          postgres    false    216            A           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    214            �           2606    16569    articles articles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.articles DROP CONSTRAINT articles_pkey;
       public            postgres    false    224            �           2606    16549 "   group_messages group_messages_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.group_messages
    ADD CONSTRAINT group_messages_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.group_messages DROP CONSTRAINT group_messages_pkey;
       public            postgres    false    222            �           2606    16526    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    219            �           2606    16493    messages message_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.messages DROP CONSTRAINT message_pkey;
       public            postgres    false    217            �           2606    16465    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    16483    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    215            �           2606    16555 +   group_messages group_messages_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_messages
    ADD CONSTRAINT group_messages_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id);
 U   ALTER TABLE ONLY public.group_messages DROP CONSTRAINT group_messages_group_id_fkey;
       public          postgres    false    222    3214    219            �           2606    16550 *   group_messages group_messages_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_messages
    ADD CONSTRAINT group_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.group_messages DROP CONSTRAINT group_messages_user_id_fkey;
       public          postgres    false    222    3208    215            �           2606    16499 "   messages message_recipient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.users(id);
 L   ALTER TABLE ONLY public.messages DROP CONSTRAINT message_recipient_id_fkey;
       public          postgres    false    217    3208    215            �           2606    16494    messages message_sender_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.messages DROP CONSTRAINT message_sender_id_fkey;
       public          postgres    false    217    215    3208            �           2606    16535 %   user_groups user_groups_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id);
 O   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT user_groups_group_id_fkey;
       public          postgres    false    220    219    3214            �           2606    16530 $   user_groups user_groups_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT user_groups_user_id_fkey;
       public          postgres    false    3208    215    220            1   
   x���          /   
   x���          ,   
   x���          *   �  x����n�0 �{���%-�$%�o��� ���Cֺ��4�찷��i�x�l�2���9)�.��`R̦���cQݨ�r��ߗ8�nG�)����{�\�7ժ*������l����V'g���������mF0ܦo��dd3F��h(�Q�F�����O�O���|�B1�}���&o$�B�G�ʛ`�����������i��M��OB�֛C�ёPY�b\��);�I
zy��O�"�
Q� �.�;yB�zO����J#�)	���C_�C��P��T&�������I��}&�񶒈��"��Lq��}�9b��*���:mH��~$�S�IB�z����a]��o|�%��
!W�HOȉ"�"�l���k0�{oK���[T���m����&<5�:6y̾�#5EF�u6ӔF��G�Su��^;��)8�Lΰ;������Q�5Ѥh�\9r���4�x�B��?)��      -   
   x���          (   �  x�ŒKO�@���{h�&�7����A����Vo<�d�,��~ziz1ƃ3���'��e�v�����!pj�,���´7I�L�$��)�*V�A���`DE�㨮x@�߂g���<�h_<1Ir!*7c%���àM��e��=<����k�5c�췁z2��X�G�;L���tS�zZ�C���$Ĕ��s�,�=����������G�_s�W�<��A��L��.�Q)�q�7�L����$Dh�z��P��M�N�ՆTOV�z��T� *�ɨS����v�
GṒ_���c�_GG�������ޕ�����q�T�����ꄻ6�O&}�Z��*��ւ���v���aǦ��[U�v�T���b!&��*m3���h�/��'N��h�	��     