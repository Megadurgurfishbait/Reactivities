using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }


            // Finna Activity

            // Skoða ef að það er null
            // Null : Senda Exception.
            // !Null : handa út Activity.

            // Skoða ef að það hafa verið gerða breytingar
            // Breytingar : Senda Success og Tóman Object.
            // !Breytingar : Senda Exception.
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {


                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new Exception("could not find activity");
                }

                _context.Remove(activity); // Sett í Added State.

                var success = await _context.SaveChangesAsync() > 0; // Save Changes skilar Int með hversu margar breytingar voru gerðar á Db.

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }

        }
    }
}