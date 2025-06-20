using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sem_2_k_2.Models;

namespace sem_2_k_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> Get() => await _context.Products.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Product>> Post(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Post), new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Products.FindAsync(id);
            if (entity == null) return NotFound();
            _context.Products.Remove(entity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
