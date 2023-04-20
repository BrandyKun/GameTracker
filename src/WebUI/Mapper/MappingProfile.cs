using Application.Dtos;
using AutoMapper;

namespace WebUI.Mapper
{
    public class MappingProfile: Profile 
    {
        public MappingProfile()
        {
            CreateMap<IGDB.Models.Search, SearchResultsToReturnDto>()
                .ForMember(dto => dto.IsGame, opt => opt.MapFrom(d => d.Game != null))
                .ForMember(dto => dto.IsPlatform, opt => opt.MapFrom(d => d.Platform != null))
                .ForMember(dto => dto.IsCharacter, opt => opt.MapFrom(d => d.Character != null));
        }
    }
}