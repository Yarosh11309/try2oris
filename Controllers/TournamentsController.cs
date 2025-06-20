using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sem_2_k_2.Models;

namespace sem_2_k_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TournamentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Tournament>> Get() => await _context.Tournaments.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Tournament>> Post(Tournament t)
        {
            _context.Tournaments.Add(t);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Post), new { id = t.Id }, t);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Tournaments.FindAsync(id);
            if (entity == null) return NotFound();
            _context.Tournaments.Remove(entity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
