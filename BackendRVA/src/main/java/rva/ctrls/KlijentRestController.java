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
import rva.jpa.Kredit;
import rva.repository.KlijentRepository;

@CrossOrigin
@RestController
public class KlijentRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("klijent")
	public Collection<Klijent> getKlijenti() {
		return klijentRepository.findAll();
	}
	
	@GetMapping("klijent/{id}")
	public Klijent getKlijent (@PathVariable("id") Integer id) {
		return klijentRepository.getOne(id);
	}
	
	@GetMapping("klijentPrezime/{prezime}")
	public Collection<Klijent> getKlijentByPrezime(@PathVariable("prezime") String prezime) {
		return klijentRepository.findByPrezimeContainingIgnoreCase(prezime);
	}
	
	@PostMapping("klijent")
	public ResponseEntity<Klijent> insertKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId()))
		{
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		return new ResponseEntity<Klijent>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("klijent")
	public ResponseEntity<Klijent> updateKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId()))
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);
		klijentRepository.save(klijent);
		return new ResponseEntity<Klijent>(HttpStatus.OK);
	}
	
	@DeleteMapping("klijent/{id}")
	public ResponseEntity<Klijent> deleteKlijent(@PathVariable("id") Integer id) {
		if(klijentRepository.existsById(id)) {		
			klijentRepository.deleteById(id);
			if(id == -100) {
								jdbcTemplate.execute("insert into klijent values (-100, 'Test ime', 'Test prezime', 111, -100)");
									
		}		
		return new ResponseEntity<Klijent>(HttpStatus.OK);

		}
		
		return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);

	}
}
