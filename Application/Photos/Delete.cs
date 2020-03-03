using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAcessor;
            private readonly IPhotoAccessor _photoAcessor;
            public Handler(DataContext context, IUserAccessor userAcessor, IPhotoAccessor photoAcessor)
            {
                _photoAcessor = photoAcessor;
                _userAcessor = userAcessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Handler Logic 
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAcessor.GetCurrentUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not Found" });
                }

                if (photo.IsMain)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You cannot delete your main photo" });
                }

                var result = _photoAcessor.DeletePhoto(photo.Id);

                if (result == null)
                {
                    throw new Exception("Problem deleting photo");

                }

                user.Photos.Remove(photo);



                var success = await _context.SaveChangesAsync() > 0; // Save Changes skilar Int með hversu margar breytingar voru gerðar á Db.

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }

        }
    }
}