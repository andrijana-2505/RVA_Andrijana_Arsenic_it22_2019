-- Test podaci
insert into public.tip_racuna (id, naziv, oznaka, opis)
values (-100, 'test', 'test', 'test');
insert into public.kredit (id, naziv, oznaka, opis)
values (-100, 'test', 'test', 'test');
insert into public.klijent (id, ime, prezime, broj_lk, kredit)
values (-100, 'test', 'test', '1111', -100);
insert into public.racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (-100, 'Račun br test', '1111', 'testt', -100, -100);
--Kredit podaci

insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Stambeni', '12S', 'Kredit kojim se finansira kupovina, izgradnja, dogradnja ili uređenje nekretnine, 
		obično sa specificiranim anuitetima u razdoblju otplate.');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit za refinansiranje', 'R58R', 'Kredit koji podrazumeva zamenu postojećeg duga po osnovu jednog ili više dobijenih kredita novim kreditom,
		obično u istom iznosu i sa istim sredstvima obezbeđenja, 
		ali pod drugačijim uslovima (kamatna stopa, duži rok otplate, grejs period ili poček)');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Investicioni', 'I123K', 'Kredit se preporučuje klijentima kojima su neophodna sredstva za finasiranje nabavke opreme, mašina,
		postrojenja, zatim izgradnju ili kupovinu proizvodnog ili poslovnog prostora.');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit za penzionere', '88P', '');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit za obrtna sredstva', 'OS25', 'Krediti za trajna obrtna sredstva će se odobravati sa rokom otplate do četiri godine u okviru
		koga je grejs period do šest meseci.');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Studentski', '78SK', 'Beskamatni kredit koji se isplaćuje tek nakon završetka fakulteta, tačnije nakon zaposlenja.');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Gotovinski', '10G', 'Odobreni iznos kredita možete koristiti u svrhu koja vam u datom trenutku odgovara.');
insert into public.kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Auto krediti', 'A05K', 'Krediti namenjeni kupovini automobila.');


--tip_racuna podaci

insert into public.tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Studentski', '11stud', 'Studentski račun namenjen studentima do 26 godina.');
insert into public.tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Dinarski', 'din88', 'Dinarski račun korisnika.');
insert into public.tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Devizni', '1dev1', 'Devizni račun korisnika.');
insert into public.tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Štedni', 'ste12', 'Štedni račun je besplatan račun i namenjen je klijentima koji su se 
		opredelili za samo jednu oblast bankarskog poslovanja.');
insert into public.tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Tekući', 'tek10', 'Tekući račun se koristi za izvršavanje platnih transakcija – uplata, prenos i isplata novčanih sredstava');


--klijent podaci

insert into public.klijent (id, ime, prezime, broj_lk, kredit)
values (nextval('klijent_seq'), 'Andrijana', 'Arsenić', '250', 1),
		(nextval('klijent_seq'), 'Marija', 'Simić', '1102', 2),
		(nextval('klijent_seq'), 'Strahinja', 'Janić', '260', 3),
		(nextval('klijent_seq'), 'Miloš', 'Marković', '100', 1),
		(nextval('klijent_seq'), 'Petar', 'Ilić', '150', 2),
		(nextval('klijent_seq'), 'Milica', 'Marković', '603', 4),
		(nextval('klijent_seq'), 'Ivan', 'Petrić', '1408', 5),
		(nextval('klijent_seq'), 'Saša', 'Dimić', '1209', 6),
		(nextval('klijent_seq'), 'Luka', 'Lukić', '2608', 7),
		(nextval('klijent_seq'), 'Gabrijela', 'Pejak', '1402', 8),
		(nextval('klijent_seq'), 'Filip', 'Filipović', '1205', 4);



--Racun podaci

insert into public.racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (nextval('racun_seq'), 'Račun br.147', '147', 'Otplata kredita', 1, 1),
		(nextval('racun_seq'), 'Račun br.258', '258', 'Otplata kredita', 2, 2),
		(nextval('racun_seq'), 'Račun br.789', '789', 'Otplata kredita', 3, 3),
		(nextval('racun_seq'), 'Račun br.159', '159', 'Otplata kredita', 4, 4),
		(nextval('racun_seq'), 'Račun br.136', '136', 'Otplata kredita', 5, 5),
		(nextval('racun_seq'), 'Račun br.852', '852', 'Otplata kredita', 1, 6),
		(nextval('racun_seq'), 'Račun br.987', '987', 'Otplata kredita', 2, 7),
		(nextval('racun_seq'), 'Račun br.657', '657', 'Otplata kredita', 3, 8),
		(nextval('racun_seq'), 'Račun br.459', '459', 'Otplata kredita', 4, 9),
		(nextval('racun_seq'), 'Račun br.444', '444', 'Otplata kredita', 5, 10),
		(nextval('racun_seq'), 'Račun br.658', '658', 'Otplata kredita', 1, 11);

