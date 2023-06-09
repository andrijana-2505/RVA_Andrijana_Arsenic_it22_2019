package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Klijent;
import rva.jpa.Racun;
import rva.repository.KlijentRepository;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
public class RacunRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("racun")
	public Collection<Racun> getRacuni() {
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	public Racun getRacun (@PathVariable("id") Integer id) {
		return racunRepository.getOne(id);
	}
	
	@GetMapping("racunKlijenta/{id}")
	public Collection<Racun> getRacuniKlijentaID(@PathVariable("id") Integer id) {
		Klijent k = klijentRepository.getOne(id);
		return racunRepository.findByKlijent(k);
	}
	
	@GetMapping("racunNaziv/{naziv}")
	public Collection<Racun> getRacunByNaziv(@PathVariable("naziv") String naziv) {
		return racunRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("racun")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId()))
		{
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId()))
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id) {
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		
		racunRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute("insert into tip_racuna (id, naziv, oznaka, opis) values (-100,'Naziv test','Opis test')");
			jdbcTemplate.execute("insert into kredit values (-100,'Naziv test','Opis test')");
					jdbcTemplate.execute(
							"INSERT INTO klijent(id, ime, prezime, broj_lk, kredit) "
							+ "VALUES (-100, 'Ime test', 'Prezime test', 111, -100)"
			);
			jdbcTemplate.execute(
					"INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent) "
					+ "VALUES (-100, 'Test racun', 'Test oznaka', 'Test opis', -100, -100)");
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
}
