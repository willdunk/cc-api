import { type Listing as ListingType, Listing, type ExternalListingLink } from "../../models/listing";
import { MakeOptional } from "../../utils/ts/makeOptional";

type RequiredAttributes = 'userId' | 'address'

type OptionalAttributes =  | 'listingDate' | 'listingPrice'

type ExternalListingLinkModified = Pick<ExternalListingLink, 'provider' | 'url'>;

type NewListingInput = Pick<ListingType, RequiredAttributes> & MakeOptional<ListingType, OptionalAttributes> & {externalListingLinks?: ExternalListingLinkModified[]};

export const createNewListing = async (input: NewListingInput) => {
    const newListing = Listing.create({
        userId: input.userId,
        address: input.address,
        externalListingLinks: input.externalListingLinks,
        listingDate: input.listingDate,
        listingPrice: input.listingPrice
    });
    return newListing;
}